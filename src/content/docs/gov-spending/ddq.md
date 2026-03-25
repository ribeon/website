# Data Provider Due Diligence Questionnaire (DDQ)

**Federal Contract Spending by Public Company Dataset**

*Prepared in accordance with the FISD Alternative Data Council DDQ framework*

---

## Company Information

| Field | Response |
|-------|----------|
| Company Name | [Your Company Name] |
| Legal Name | [Same / Different if applicable] |
| Principal Business Address | [Address] |
| Years in Business | [X] |
| Relevant Affiliates | None |
| Regulated Entity | No |
| Website | [URL] |
| Executive Contact | [Name, Title, Email] |
| Questionnaire Reviewed By | [Name 1, Title]; [Name 2, Title] |
| Effective Date | [Date] |

**Investment Policy**: The Company does not make investments or allow employees to make investments based on the Data. The Company does not model, maintain a "paper book," or otherwise track potential performance of the data product against public equity markets. This is a data product business; the Company does not engage in securities trading.

---

## Product/Service Information

### General

**Product Name**: Federal Contract Spending by Public Company

**Description**: A quarterly and daily panel dataset mapping US federal contract obligations from the Federal Procurement Data System (FPDS) to SEC-registered stock tickers. The dataset covers 142 tickers across 76 quarters (FY2007 Q1 through FY2025 Q3), representing approximately $7.3 trillion in mapped federal contract obligations. Pre-computed signals include spending momentum, surprise measures, and agency concentration metrics with cross-sectional rankings.

**Year First Offered**: [Year]

**Active Customers**:
- Financial services: [Number]
- Non-financial services: [Number]

**Simultaneous Dissemination**: Yes. All customers receive identical data files on the same schedule.

**Third-Party Dependencies**: No. The underlying data source (USAspending.gov / FPDS bulk archives) is a US government open data resource with no access restrictions, licensing fees, or expiration risk. The data is published under US government open data policy and is not subject to copyright.

**Data Collection Method**: The Company downloads and processes publicly available bulk data archives. The Company does not buy data from third-party aggregators.

---

## Dataset Information

**Countries/States of Origin**: United States. All data originates from the US Federal Procurement Data System (FPDS), published by the General Services Administration (GSA) via USAspending.gov.

**Data Storage**: [Country/State/Cloud provider]. Data is stored in Parquet format.

**Data Generating/Collection Methods**:

- [ ] Web scraping
- [ ] Apps; browser plugins; from consumers generally
- [ ] From third party aggregators
- [ ] IoT devices
- [ ] Financial transaction/exchange
- [x] **Government/public sources** — Bulk CSV archives published by the US government at USAspending.gov pursuant to the Federal Funding Accountability and Transparency Act (FFATA) and the DATA Act. SEC EDGAR company ticker data (public).
- [ ] On-premise data collection
- [ ] Calls with public companies, expert networks, surveys
- [ ] Satellite/drone/radar collection

**Underlying Information Providers**: The US federal government, specifically:
1. **General Services Administration (GSA)** — publishes FPDS contract award data via USAspending.gov bulk data archives
2. **Securities and Exchange Commission (SEC)** — publishes company ticker mappings via EDGAR

Both are US government agencies publishing data under federal open data mandates.

**Diligence on Data Sources**: The underlying data is published by the US federal government under statutory mandate (FFATA / DATA Act). Government agencies are required by law to report contract obligations to FPDS. There is no question of legal right — this is public government data published for transparency purposes.

**Contracts with Primary Data Providers**: No. The data is freely available from government websites. No contracts, licenses, or API keys are required for access.

---

## MNPI, Covered Personal Information, and Other Issues

### MNPI/Inside Information

**Does the Data contain MNPI or inside information, or is it potentially derived from MNPI?**
No.

The Data is derived exclusively from public government records. Federal contract awards are public information published by the US government under FFATA and the DATA Act. All source data is freely available at USAspending.gov with no access restrictions. The data is published with a ~3 business day lag from the contract action date — this publication schedule is set by government policy and applies equally to all parties.

**Does the Company engage in activities involving MNPI?**
No.

**Does the Data contain confidential information?**
No. All source data is public government records. The dataset does not incorporate any non-public, confidential, or proprietary information from any third party.

**Diligence on MNPI issues**: The Data is constructed entirely from:
1. FPDS bulk archives (public, published by GSA)
2. SEC EDGAR ticker data (public, published by SEC)

Neither source contains MNPI. Contract awards become public record upon obligation. The Company adds value through entity resolution (mapping contractor names to stock tickers), signal computation, and data cleaning — none of which introduces non-public information.

**Fiduciary duty / breach of contract / deceptive behavior**: Not applicable. The Data is derived from public government records. No fiduciary relationships, contractual restrictions, or deceptive practices are involved in obtaining the source data.

### Personal Data / PII

**Does the Company collect Covered Personal Information?**
No.

The Data contains no Personally Identifiable Information (PII). The dataset contains:
- Aggregated dollar amounts of federal contract obligations
- Publicly registered corporate names and stock ticker symbols
- Government agency names
- Computed statistical signals

No individual names, addresses, Social Security numbers, device identifiers, location data, or any other PII is collected, stored, or distributed. The lowest level of granularity is company-level daily aggregations.

**How does the Company identify PII?** The Company reviews all data fields in the source FPDS archives and extracts only aggregate corporate-level fields. Individual recipient names, addresses, and identifiers (DUNS/UEI) are used only during entity resolution processing and are not included in the delivered dataset.

### Other Issues

**Web Scraping**: No. The Company downloads pre-generated bulk archive files from USAspending.gov. This is the government's intended distribution mechanism for bulk data access. No scraping, crawling, or automated harvesting of web pages is performed.

**API Calls**: The Company makes limited API calls to the USAspending.gov public API for supplementary data (e.g., parent company resolution). The USAspending API is a public API provided by the US government for this purpose, with no terms of service restrictions on commercial use.

**Mobile Device Data**: No. The Company does not collect any data from mobile devices or about individuals' digital device usage.

---

## Company Legal and Regulatory Information

### Internal Legal and Regulatory Controls

**Legal Department**: [Describe your legal/compliance setup]

**Outside Counsel**: [Name of firm, if any]

**Compliance Management**: The Data is derived exclusively from public government sources. The Company maintains the following practices:
- Regular review of USAspending.gov terms and data publication policies
- Documentation of all data sources and transformation steps
- Point-in-time reconstruction methodology to prevent look-ahead bias
- Entity resolution audit trail with match confidence scores

**Written Policies**: [Yes/No — describe policies on MNPI, PII, confidential information, data supplier diligence]

### Data Collection and Dissemination

**Terms of Use Compliance**: USAspending.gov data is published under US government open data policy. There are no terms of use restricting commercial use, redistribution, or derivative work. SEC EDGAR data is similarly public.

**Legal History (Past 5 Years)**:
- [ ] Received a cease and desist order
- [ ] Been sued/notified of alleged claim
- [ ] Received a subpoena
- [ ] Been subject to investigation by a regulator
- [x] **None of the above**

**Upstream Provider Legal History**: Not applicable — the data providers are US government agencies (GSA, SEC).

---

## Document Request List — Attachments

| Document | Status |
|----------|--------|
| Product description / tear sheet | See `README.md` and Research Whitepaper |
| Data dictionary / schema | See `data_dictionary.md` (standalone document) |
| Sample data (< 100 rows, > 3 months old) | Available — see `data/sample/quarterly_signals_sample.csv` |
| Upstream contracts / licenses | N/A — public government data, no licenses required |
| User consent / collection terms | N/A — no PII collected |

---

## Appendices

### Appendix 1: Covered Personal Information
*Not applicable — the Data does not contain Covered Personal Information.*

### Appendix 2: Web Scraping / API Collection
*Not applicable — the Company does not scrape websites. Bulk archive downloads and limited public API calls to government endpoints only.*

### Appendix 3: Mobile Device Data
*Not applicable — the Company does not collect mobile device data.*

---

*This DDQ was prepared in accordance with the FISD Alternative Data Council Due Diligence Questionnaire framework (May 2022 edition). Bracketed fields [like this] should be completed with company-specific information before distribution to prospective clients.*
