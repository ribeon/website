# Delivery & Access Options

**Federal Contract Spending by Public Company Dataset**

---

## Delivery Formats

### Primary: Parquet Files

All tables are delivered as Apache Parquet files — the industry standard for columnar analytical data.

| Table | Size | Rows | Update Frequency |
|-------|------|------|-----------------|
| `daily_awards_by_ticker.parquet` | ~27 MB | ~501K | Quarterly |
| `quarterly_awards_by_ticker.parquet` | ~604 KB | ~9,469 | Quarterly |
| `quarterly_signals.parquet` | ~1.4 MB | ~9,469 | Quarterly |
| `enriched_quarterly_signals.parquet` | ~1.1 MB | ~9,469 | Quarterly |
| `full_quarterly_signals.parquet` | ~1.6 MB | ~9,469 | Quarterly |
| `modification_signals.parquet` | ~331 KB | ~9,200 | Quarterly |
| `material_modifications.parquet` | ~968 KB | ~47,531 | Quarterly |
| `pit_daily_awards_by_ticker.parquet` | ~18 MB | ~435K | Quarterly |
| `contractor_ticker_map_temporal.csv` | ~36 KB | ~540 | As needed |

**Total dataset size**: ~52 MB (compressed Parquet)

**Compatible with**: pandas, polars, DuckDB, Apache Spark, Snowflake, BigQuery, Redshift, Databricks, R (arrow), Julia, and any platform supporting Apache Arrow/Parquet.

### Secondary: CSV

All tables can also be delivered as CSV files upon request.

---

## Delivery Channels

### Option 1: S3 Bucket (Recommended)

Dedicated S3 bucket with IAM-based access control.

**Setup**:
- Client provides AWS Account ID
- We grant cross-account read access via IAM policy
- Data synced to bucket on update schedule

**Structure**:
```
s3://[bucket-name]/
├── latest/
│   ├── daily_awards_by_ticker.parquet
│   ├── quarterly_awards_by_ticker.parquet
│   ├── quarterly_signals.parquet
│   ├── enriched_quarterly_signals.parquet
│   ├── full_quarterly_signals.parquet
│   ├── modification_signals.parquet
│   ├── material_modifications.parquet
│   ├── pit_daily_awards_by_ticker.parquet
│   └── contractor_ticker_map_temporal.csv
├── archive/
│   └── YYYY-MM-DD/
│       └── [same structure]
└── metadata/
    ├── data_dictionary.md
    └── CHANGELOG.md
```

**Benefits**: Low latency, integrates with existing data infrastructure, versioned history, automated ingestion via S3 events.

### Option 2: Snowflake Data Share

Direct Snowflake data sharing — no ETL required on the client side.

**Setup**:
- Client provides Snowflake Account Locator
- We create a Snowflake Data Share
- Client mounts the share as a read-only database

**Benefits**: Zero-copy data sharing, no data movement, SQL access immediately, automatic updates.

### Option 3: REST API

Live API access for real-time queries and integration into trading systems.

**Base URL**: Provided upon onboarding
**Authentication**: API key (Bearer token)
**Rate Limit**: 1,000 requests/minute

**Endpoints**:
| Endpoint | Description |
|----------|-------------|
| `GET /health` | API status |
| `GET /tickers` | List all tickers in universe |
| `GET /signals/quarterly?ticker=LMT&start=2023Q1` | Quarterly signals for a ticker |
| `GET /awards/daily?ticker=BA&start=2024-01-01` | Daily awards for a ticker |
| `GET /awards/quarterly?ticker=RTX` | Quarterly awards for a ticker |
| `GET /rankings/{quarter}` | Cross-sectional rankings for a quarter |
| `GET /top-movers?quarter=2024Q1&n=10` | Top movers by composite rank |

**Response format**: JSON

### Option 4: SFTP

Secure file transfer for clients with strict network policies.

**Setup**: Client provides SFTP endpoint and credentials, or we provide an SFTP server.
**Schedule**: Files pushed on update cycle.

---

## Update Schedule

| Component | Frequency | Delivery Lag |
|-----------|-----------|-------------|
| Daily awards | Quarterly batch | ~3-5 business days from FPDS publication |
| Quarterly signals | Quarterly | Within 2 weeks of quarter-end |
| Entity resolution map | As needed | Upon M&A events or mapping corrections |
| Lobbying enrichment | Quarterly | Dependent on OpenSecrets filing schedule |

**Notification**: Clients are notified via email when new data is available. S3 clients can additionally configure SNS/SQS event notifications.

---

## Onboarding

1. **Trial**: 2-quarter sample dataset (CSV) for evaluation
2. **Contract**: Standard data license agreement
3. **Delivery setup**: Configure preferred delivery channel (1-2 business days)
4. **Full delivery**: Complete historical dataset + documentation
5. **Ongoing**: Quarterly updates on agreed schedule

---

## Technical Support

- Dedicated Slack channel or email support
- Data dictionary and schema documentation included
- Sample code (Python, R, SQL) for common queries
- Onboarding call to walk through dataset structure and signals
