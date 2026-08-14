# Mock edge services

Five dependency-free Node services that stand in for the production gateways.
Each product application has exactly one:

| Service | Port | Line of business | Consumed by |
|---|---|---|---|
| `accounts-api` | 7001 | RETAIL | digital-banking |
| `cards-api` | 7002 | CARDS | card-services |
| `mortgage-api` | 7003 | HOME_LOANS | mortgage-origination |
| `wealth-api` | 7004 | WEALTH | wealth-advisor |
| `payments-api` | 7005 | BUSINESS_BANKING | small-business-banking |

```bash
npm run services            # all five
node services/cards-api     # just one
curl localhost:7002/cards
```

The Angular applications currently read from in-memory fixtures that match
these payloads, so the front end runs with or without the services. The
services are **out of scope for the Angular 18 uplift** — they are here so the
repository looks and behaves like the real estate.
