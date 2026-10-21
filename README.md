# Ribeon

> Cloud storage is now the default. Local data is retained as a backup. See the [shared storage setup](https://github.com/ribeon/workspace/blob/main/storage/README.md) for authentication, dependencies and explicit local overrides.


Ribeon builds actionable alternative datasets from primary sources, mapped to tradeable instruments for institutional investors and quantitative researchers.

Visit [ribeon.com](https://ribeon.com) to learn more.


## Workspace data

Website sample and evidence payloads live in `gs://ribeon-data/workspaces/ribeon/data/website/content/`. `npm run build` and `npm run dev` read those objects using the gcloud CLI and generate ignored TypeScript modules. Authenticate with a bucket-reader identity before building. No local data restoration is needed.

GitHub Actions needs Google Cloud authentication before the build. Configure the repository variables `GCP_WORKLOAD_IDENTITY_PROVIDER` and `GCP_SERVICE_ACCOUNT` for an existing workload-identity setup that grants read access to the content prefix. The workflow fails explicitly if these are missing; no service keys or personal tokens are committed.
