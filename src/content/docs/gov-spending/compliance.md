# Data Sourcing & Legal Compliance

**Federal Contract Spending by Public Company Dataset**

---

## Summary

All data in this product is derived exclusively from **public US government records**. No private, proprietary, confidential, or personally identifiable information is used. The dataset is fully compliant with securities regulations regarding Material Non-Public Information (MNPI) and data privacy laws.

---

## Primary Data Sources

### 1. Federal Procurement Data System (FPDS) via USAspending.gov

**Source**: https://usaspending.gov
**Publisher**: US General Services Administration (GSA)
**Legal Mandate**: Published pursuant to the Federal Funding Accountability and Transparency Act of 2006 (FFATA, P.L. 109-282) and the Digital Accountability and Transparency Act of 2014 (DATA Act, P.L. 113-101).

**Access Method**: Pre-generated bulk CSV archives downloaded from https://files.usaspending.gov/award_data_archive/. No API keys, authentication, or licensing agreements required.

**Data Content**: Federal contract award actions including:
- Obligated dollar amounts
- Awarding agency
- Recipient (contractor) name and parent company
- Contract type, NAICS code, product/service codes
- Performance dates and locations

**Public Availability**: FPDS data is explicitly published for public transparency. Per 48 CFR 4.602, contracting officers are required to report contract actions to FPDS. Per the DATA Act, this data must be made publicly available.

**Terms of Use**: US government data is not subject to copyright (17 U.S.C. 105). There are no restrictions on commercial use, redistribution, or creation of derivative works.

### 2. SEC EDGAR Company Tickers

**Source**: https://www.sec.gov/files/company_tickers_exchange.json
**Publisher**: US Securities and Exchange Commission (SEC)
**Legal Mandate**: Published under SEC's mandate for market transparency.

**Data Content**: Mapping of SEC-registered companies to stock ticker symbols and exchanges.

**Terms of Use**: Public government data, no restrictions on commercial use.

---

## What the Dataset Does NOT Contain

| Category | Status |
|----------|--------|
| Material Non-Public Information (MNPI) | **Not present**. All source data is published by the US government on public websites. |
| Personally Identifiable Information (PII) | **Not present**. The dataset aggregates to the company-ticker level. No individual names, addresses, SSNs, or device identifiers are included in deliverables. |
| Confidential Information | **Not present**. No NDAs, confidentiality agreements, or restricted-access data sources are used. |
| Web-Scraped Data | **Not used**. Data is obtained via government-provided bulk download archives, not web scraping. |
| Mobile/Device Data | **Not used**. No consumer device data of any kind. |
| Expert Network / Survey Data | **Not used**. No human-sourced intelligence. |
| Satellite/Geolocation Data | **Not used**. |

---

## MNPI Analysis

Federal contract awards are **public information** from the moment of obligation. The data publication timeline is:

1. **Contract action signed** by government contracting officer (Day 0)
2. **Reported to FPDS** within 3 business days (per 48 CFR 4.604)
3. **Published on USAspending.gov** after FPDS ingestion (~3 business days total)
4. **Available in bulk archives** on the next archive refresh cycle

This data is simultaneously available to all market participants through USAspending.gov. There is no selective disclosure or tiered access. The Company's value-add is in cleaning, entity resolution, and signal computation — not in having early or exclusive access to the underlying government records.

**Point-in-Time Compliance**: The dataset includes point-in-time (PIT) versions of all tables that incorporate the empirically observed 3 business day FPDS publication lag. This ensures that any analysis using the PIT tables does not benefit from look-ahead bias.

---

## Data Privacy Compliance

### GDPR / CCPA / State Privacy Laws
Not applicable. The dataset contains no personal data. All information pertains to corporate entities (government contractors) and their aggregate contract activity.

### Individual-Level Data Handling
During processing, the pipeline reads FPDS fields including `recipient_name` and `recipient_parent_name` (corporate names, not individual names). These are used solely for entity resolution (mapping contractor names to stock tickers) and are aggregated before inclusion in the delivered dataset. No individual-level data is retained or delivered.

---

## Intellectual Property

### Source Data
US government works are not subject to copyright protection (17 U.S.C. 105). The FPDS data and SEC EDGAR data are in the public domain.

### Value-Added Components
The Company's proprietary contributions include:
- **Entity resolution mapping**: 73 curated manual overrides, 44 M&A event timelines with SEC 8-K verified dates
- **Signal computation**: UGR surprise, momentum, concentration, and composite ranking methodology
- **Data cleaning and quality assurance**: Deduplication, outlier handling, panel balancing
- **Point-in-time reconstruction**: Methodology for bias-free historical analysis

These value-added components are the Company's intellectual property and are protected by trade secret and copyright.

---

## Regulatory References

| Regulation | Relevance |
|------------|-----------|
| FFATA (P.L. 109-282) | Mandates public disclosure of federal spending data |
| DATA Act (P.L. 113-101) | Requires standardized, machine-readable spending data publication |
| 48 CFR 4.602-4.604 | Requires contracting officers to report to FPDS within 3 business days |
| 17 U.S.C. 105 | US government works not subject to copyright |
| SEC Rule 10b-5 | MNPI trading prohibition — not applicable (all data is public) |
| GDPR / CCPA | Not applicable (no personal data) |

---

## Frequently Asked Questions

**Q: Is this data available to everyone?**
A: Yes. The raw FPDS data is publicly available at USAspending.gov. Anyone can download it. Our value is in the entity resolution (mapping 500+ contractor names to 142 stock tickers with M&A-aware temporal logic), signal computation, quality assurance, and delivery infrastructure.

**Q: Could this data be considered MNPI?**
A: No. MNPI is information that is (1) material and (2) not publicly available. Federal contract awards are published by the government on public websites. The data is simultaneously available to all market participants.

**Q: Do you have early access to the data?**
A: No. We download the same bulk archives available to the public. Our delivery lag is ~3-5 business days from contract action, matching the government's own publication timeline.

**Q: Is there any PII in the dataset?**
A: No. The delivered dataset contains only company-level aggregations identified by stock ticker symbols. No individual names, addresses, or identifiers are included.

**Q: What about classified or restricted contracts?**
A: Classified contracts are not reported in FPDS and therefore do not appear in this dataset. The dataset covers only unclassified contract obligations that the government has chosen to publish.
