// Build-time reads only. Credentials never reach generated modules or the browser.
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const names = ['dataset-meta', 'gov-housing-evidence', 'gov-housing-sample',
  'gov-spending-evidence', 'gov-spending-sample', 'regions', 'weather-evidence',
  'weather-signals-sample'];
const local = process.env.RIBEON_LOCAL_DATA_ROOT;
const cloud = process.env.RIBEON_WORKSPACE_DATA_ROOT ||
  `${process.env.RIBEON_DATA_ROOT || 'gs://ribeon-data'}/workspaces/ribeon/data`;
let token;
if (!local) {
  token = execFileSync('gcloud', ['auth', 'print-access-token', '--quiet'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}
const modules = await Promise.all(names.map(async name => {
  let content;
  if (local) {
    content = await readFile(path.join(local, 'website', 'content', `${name}.json`), 'utf8');
  } else {
    const match = /^gs:\/\/([^/]+)\/(.+)$/.exec(`${cloud}/website/content/${name}.json`);
    if (!match) throw new Error('RIBEON_WORKSPACE_DATA_ROOT must be a gs:// URI');
    const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(match[1])}/o/${encodeURIComponent(match[2])}?alt=media`;
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`Cloud content read failed for ${name}: HTTP ${response.status}`);
    content = await response.text();
  }
  const data = JSON.parse(content);
  return [name, `// Generated build input; source of truth is GCS.\nexport default ${JSON.stringify(data)};\n`];
}));
const output = path.join(root, 'src/lib/data/generated');
await mkdir(output, { recursive: true });
for (const [name, source] of modules) {
  const target = path.join(output, `${name}.ts`);
  await writeFile(`${target}.tmp`, source);
  await rename(`${target}.tmp`, target);
}
console.log(`Prepared ${modules.length} website data modules from ${local ? 'explicit local override' : 'GCS'}.`);
