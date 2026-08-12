# Free and Free-Tier APIs for Academic Research Agents

**Verified:** 12 August 2026  
**Purpose:** A practical API stack for agents that search the web, discover scholarly literature, verify citations, locate lawful open-access copies, and retrieve domain-specific research data.

> **Important:** “Free” can mean no-key public access, a permanent monthly allowance, daily credits, or one-time trial credits. Providers can change quotas. Check the linked official pricing/documentation page before production deployment.

---

## 1. Recommended zero/low-cost stack

For most academic research agents, use this combination:

```text
General web search         → Tavily
Alternative semantic search → Exa
Scholarly discovery        → OpenAlex
Citation/reference graph   → Semantic Scholar
DOI and citation metadata  → Crossref
Open-access location       → Unpaywall
Medical literature         → PubMed + Europe PMC
Preprints                  → arXiv
Open-access journal filter → DOAJ
Clinical trials            → ClinicalTrials.gov
Dataset DOI metadata       → DataCite
```

This is better than making one search provider do everything. A strong agent should use each API for the task it handles best.

---

# 2. Web-search APIs

## 2.1 Tavily — best first choice for a general research agent

- **Use for:** current web search, recent news, reports, policies, organizational webpages, and agent/RAG search.
- **Free allowance:** 1,000 API credits every month.
- **Card required:** No.
- **Basic search cost:** 1 credit.
- **Advanced search cost:** 2 credits.
- **Get a key:** https://app.tavily.com/
- **Pricing:** https://www.tavily.com/pricing
- **Documentation:** https://docs.tavily.com/
- **Endpoint:** `POST https://api.tavily.com/search`

### Python example

```python
import os
import requests

response = requests.post(
    "https://api.tavily.com/search",
    headers={
        "Authorization": f"Bearer {os.environ['TAVILY_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "query": "latest systematic reviews on social media and student performance",
        "search_depth": "basic",
        "max_results": 10,
        "include_answer": False,
        "include_raw_content": False,
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

### Advantages

- Designed for AI agents.
- Clean JSON results.
- Can search, extract, map, and crawl.
- Domain inclusion/exclusion and date controls.
- Free requests stop when the free limit is exhausted unless billing is enabled.

### Limitation

It is a web-search API, not a substitute for bibliographic databases or full-text critical reading.

---

## 2.2 Exa — strong for semantic and research-oriented web search

- **Use for:** semantic search, similar-page discovery, technical research, web content, scholarly works, and agent workflows.
- **Free allowance:** $20 credit at signup plus $10 in credits each month.
- **Card required:** No for the free starter tier.
- **Get a key:** https://dashboard.exa.ai/
- **Pricing:** https://exa.ai/pricing
- **Documentation:** https://exa.ai/docs/
- **Endpoint:** `POST https://api.exa.ai/search`

### Python example

```python
import os
import requests

response = requests.post(
    "https://api.exa.ai/search",
    headers={
        "x-api-key": os.environ["EXA_API_KEY"],
        "Content-Type": "application/json",
    },
    json={
        "query": "recent peer reviewed research on AI-supported formative assessment",
        "numResults": 10,
        "contents": {"highlights": True},
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

### Advantages

- Meaning-based retrieval rather than only keyword matching.
- Can return page text/highlights.
- Includes a scholarly-works index.
- Useful for “find similar sources” workflows.

### Limitation

Free access is credit-based. Deep-search or content-heavy calls consume credits more quickly than simple search.

---

## 2.3 Serper — inexpensive Google-style results and a Scholar endpoint

- **Use for:** structured Google web, image, news, map, patent, and Scholar-style results.
- **Free allowance:** 2,500 signup queries.
- **Card required:** No for the initial free queries.
- **Important:** The public page says “2,500 free queries” but does not promise that they renew monthly. Treat them as a signup allowance unless the account dashboard states otherwise.
- **Get a key:** https://serper.dev/
- **Web endpoint:** `POST https://google.serper.dev/search`
- **Scholar endpoint:** `POST https://google.serper.dev/scholar`
- **Authentication header:** `X-API-KEY`

### Python Scholar example

```python
import os
import requests

response = requests.post(
    "https://google.serper.dev/scholar",
    headers={
        "X-API-KEY": os.environ["SERPER_API_KEY"],
        "Content-Type": "application/json",
    },
    json={
        "q": '"social media" "academic performance" university students',
        "num": 10,
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

### Important legal/status note

This is not an official Google Scholar API. It is a third-party service that returns structured search results. Review the provider’s terms, Google’s terms, and your use case before production deployment.

---

## 2.4 SerpApi — mature Google Scholar connector with a small monthly free plan

- **Use for:** Google Scholar, Scholar profiles, citations, case law, Google Search, and many other search engines.
- **Free allowance:** 250 searches per month.
- **Free throughput:** 50 successful searches per hour.
- **Get a key:** https://serpapi.com/users/sign_up
- **Pricing:** https://serpapi.com/pricing
- **Google Scholar docs:** https://serpapi.com/google-scholar-api

### Python example

```python
import os
import requests

response = requests.get(
    "https://serpapi.com/search.json",
    params={
        "engine": "google_scholar",
        "q": '"climate anxiety" university students',
        "api_key": os.environ["SERPAPI_KEY"],
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

### Advantages

- Mature documentation and structured Scholar results.
- Useful if exact Google Scholar result features are necessary.

### Limitations

- The free plan is small.
- It is a third-party Scholar connector, not a Google-operated Scholar API.
- The result record or snippet is not proof that the agent has read the paper.

---

## 2.5 Brave Search API — independent web index with monthly credits

- **Use for:** general web, news, image, video, and LLM-context search.
- **Current price:** $5 per 1,000 Search requests.
- **Monthly credit:** $5 in credits each month, approximately 1,000 ordinary Search requests.
- **Pricing:** https://api-dashboard.search.brave.com/app/plans
- **Documentation:** https://api.search.brave.com/app/documentation

### Billing caution

Brave’s current arrangement is credit-supported metered billing, not the old hard-capped free plan. Confirm whether a payment method is required and set account-level limits or alerts so an agent cannot create accidental overage charges.

---

## 2.6 DuckDuckGo Instant Answer API — free, but not full web search

- **Use for:** definitions, entity summaries, disambiguation, and related topics.
- **Cost:** Free.
- **Key:** None.
- **Endpoint:** `GET https://api.duckduckgo.com/`

```python
import requests

response = requests.get(
    "https://api.duckduckgo.com/",
    params={
        "q": "systematic review",
        "format": "json",
        "no_html": 1,
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

**Do not use it as the agent’s main search API.** It returns instant-answer data, not a reliable list of ranked organic web results. Many specialist queries return little or nothing.

---

# 3. The truth about a Google Scholar API

## Google does not offer an official public Google Scholar API

There is no Google-operated Scholar endpoint, API-key registration process, documented quota, or official programmatic-access product.

Your choices are:

1. **Recommended:** use OpenAlex, Semantic Scholar, Crossref, PubMed, Europe PMC, DOAJ, and other official scholarly APIs.
2. **If exact Scholar results are essential:** use a third-party provider such as Serper or SerpApi and review its terms.
3. **Avoid in production:** direct scraping libraries such as `scholarly` that automate Google Scholar pages. They are vulnerable to CAPTCHA/IP blocking and may conflict with applicable terms.

A useful replacement architecture is:

```text
Google-Scholar-like discovery → OpenAlex
Paper relevance/citation graph → Semantic Scholar
DOI verification             → Crossref
Lawful full-text location     → Unpaywall
Field-specific precision      → PubMed, Europe PMC, arXiv, etc.
```

---

# 4. Scholarly APIs

## 4.1 OpenAlex — best broad scholarly discovery API

- **Use for:** works, authors, institutions, topics, sources, publishers, funders, citation relationships, and DOI-based discovery.
- **Cost:** Free API key with $1/day of API usage.
- **Data license:** Open catalog; review current terms for the specific fields/content used.
- **Get a key:** https://openalex.org/settings/api
- **Documentation:** https://developers.openalex.org/
- **Base endpoint:** `https://api.openalex.org/`

### Python example

```python
import os
import requests

response = requests.get(
    "https://api.openalex.org/works",
    params={
        "search": "social media academic performance university students",
        "filter": "from_publication_date:2020-01-01",
        "per-page": 25,
        "api_key": os.environ["OPENALEX_API_KEY"],
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

### Best uses

- Broad academic discovery across disciplines.
- Finding DOI, open-access status, cited/referenced works, author records, and institutions.
- Replacing many Google Scholar discovery functions with a sanctioned API.

### Limitation

Metadata coverage and quality vary. A record is not proof of peer review, methodological quality, or full-text access.

---

## 4.2 Semantic Scholar Academic Graph API

- **Use for:** paper and author search, references, citations, related papers, citation counts, and open-access links where available.
- **Cost:** Most endpoints are publicly accessible; a free API key is recommended and provides a defined introductory quota.
- **Typical introductory key rate:** 1 request per second, subject to current policy.
- **Key/application:** https://www.semanticscholar.org/product/api
- **API docs:** https://api.semanticscholar.org/api-docs/
- **Base endpoint:** `https://api.semanticscholar.org/graph/v1/`

### Python example

```python
import os
import requests

headers = {}
if os.getenv("SEMANTIC_SCHOLAR_API_KEY"):
    headers["x-api-key"] = os.environ["SEMANTIC_SCHOLAR_API_KEY"]

response = requests.get(
    "https://api.semanticscholar.org/graph/v1/paper/search",
    headers=headers,
    params={
        "query": "social media academic performance university students",
        "limit": 20,
        "fields": "title,authors,year,abstract,venue,citationCount,externalIds,isOpenAccess,openAccessPdf",
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

### Limitation

Citation counts differ among indexes. Do not mix OpenAlex, Semantic Scholar, Scopus, Web of Science, and Google Scholar counts as though they are directly equivalent.

---

## 4.3 Crossref REST API — DOI and reference metadata verification

- **Use for:** finding/validating DOIs, title, author, journal, date, volume, issue, pages, funders, licenses, and correction/retraction metadata where deposited.
- **Cost:** Free public REST API.
- **Key:** None.
- **Recommended identification:** Include your email in `mailto` and a descriptive `User-Agent`.
- **Public/polite limits:** Check response headers; Crossref currently documents higher limits for identified “polite” requests than anonymous requests.
- **Documentation:** https://www.crossref.org/documentation/retrieve-metadata/rest-api/
- **Base endpoint:** `https://api.crossref.org/`

### Python example

```python
import requests

EMAIL = "research-agent@example.com"
headers = {
    "User-Agent": f"AcademicResearchAgent/1.0 (mailto:{EMAIL})"
}

response = requests.get(
    "https://api.crossref.org/works",
    headers=headers,
    params={
        "query.bibliographic": "social media academic performance university students",
        "rows": 10,
        "mailto": EMAIL,
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()["message"]["items"]
```

### Best rule

Use Crossref to verify citation metadata, not to decide whether a paper’s method is credible.

---

## 4.4 Unpaywall — lawful open-access copies

- **Use for:** locating a lawful open-access version of a DOI-assigned article.
- **Cost:** Free.
- **Key:** None; a real email parameter is required.
- **Limit:** 100,000 calls per day.
- **Documentation:** https://unpaywall.org/products/api
- **Endpoint:** `GET https://api.unpaywall.org/v2/{doi}`

```python
import requests
from urllib.parse import quote

DOI = "10.1038/nature12373"
EMAIL = "research-agent@example.com"

response = requests.get(
    f"https://api.unpaywall.org/v2/{quote(DOI, safe='')}",
    params={"email": EMAIL},
    timeout=30,
)
response.raise_for_status()
data = response.json()

best_location = data.get("best_oa_location") or {}
legal_pdf = best_location.get("url_for_pdf")
```

Do not infer that a missing Unpaywall link authorizes use of a pirated copy.

---

## 4.5 PubMed/NCBI E-utilities

- **Use for:** biomedical and life-science literature, PubMed records, MeSH-informed searches, and related NCBI databases.
- **Cost:** Free.
- **Without key:** Up to 3 requests per second.
- **With free NCBI key:** Up to 10 requests per second by default.
- **Get a key:** Create an NCBI account, then open Account Settings.
- **Documentation:** https://www.ncbi.nlm.nih.gov/books/NBK25497/
- **Base endpoint:** `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/`

### Python search example

```python
import os
import requests

params = {
    "db": "pubmed",
    "term": '(social media[Title/Abstract]) AND (academic performance[Title/Abstract])',
    "retmode": "json",
    "retmax": 20,
    "tool": "AcademicResearchAgent",
    "email": "research-agent@example.com",
}
if os.getenv("NCBI_API_KEY"):
    params["api_key"] = os.environ["NCBI_API_KEY"]

response = requests.get(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
    params=params,
    timeout=30,
)
response.raise_for_status()
ids = response.json()["esearchresult"]["idlist"]
```

Use `ESearch` to find IDs, `ESummary` or `EFetch` to retrieve records, and `ELink` to identify relationships. Batch requests rather than calling once per paper.

---

## 4.6 Europe PMC REST API

- **Use for:** life-science and biomedical articles, preprints, grants, references, citations, and open full text where available.
- **Cost:** Free public API.
- **Key:** None for ordinary public access.
- **Documentation:** https://europepmc.org/RestfulWebService
- **Endpoint:** `https://www.ebi.ac.uk/europepmc/webservices/rest/search`

```python
import requests

response = requests.get(
    "https://www.ebi.ac.uk/europepmc/webservices/rest/search",
    params={
        "query": 'TITLE_ABS:"social media" AND TITLE_ABS:"academic performance"',
        "format": "json",
        "pageSize": 25,
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

---

## 4.7 arXiv API

- **Use for:** physics, mathematics, computer science, quantitative biology, statistics, economics, and related preprints.
- **Cost:** Free.
- **Key:** None.
- **Rate rule:** No more than one legacy API request every three seconds, one connection at a time.
- **Documentation:** https://info.arxiv.org/help/api/
- **Endpoint:** `https://export.arxiv.org/api/query`

```python
import requests

response = requests.get(
    "https://export.arxiv.org/api/query",
    params={
        "search_query": 'all:"large language models"',
        "start": 0,
        "max_results": 20,
        "sortBy": "submittedDate",
        "sortOrder": "descending",
    },
    headers={"User-Agent": "AcademicResearchAgent/1.0 (contact@example.com)"},
    timeout=30,
)
response.raise_for_status()
feed_xml = response.text
```

Label arXiv work as a preprint unless a peer-reviewed version is verified.

---

## 4.8 DOAJ API

- **Use for:** searching journals and articles in the Directory of Open Access Journals.
- **Cost:** Public search/retrieval is free.
- **Key:** No key is needed for public journal/article search. Keys are mainly for authenticated publisher operations.
- **Documentation:** https://doaj.org/api/docs
- **Base endpoint:** `https://doaj.org/api/`
- **Current documented version:** v4.

Example article search URL:

```text
https://doaj.org/api/search/articles/title:%22academic%20performance%22
```

DOAJ helps identify open-access journals; the agent must still appraise each article’s methods and relevance.

---

## 4.9 DataCite REST API

- **Use for:** DOI metadata for datasets, software, preprints, repositories, and other research objects often registered with DataCite rather than Crossref.
- **Cost:** Free public GET access.
- **Key:** None for public retrieval.
- **Current public rate categories:** Anonymous requests have a lower quota; identifying the client by email/User-Agent raises the documented limit.
- **Documentation:** https://support.datacite.org/docs/api
- **Rate limits:** https://support.datacite.org/docs/rate-limit
- **Base endpoint:** `https://api.datacite.org/`

```python
import requests

response = requests.get(
    "https://api.datacite.org/dois",
    params={"query": "climate anxiety dataset", "page[size]": 10},
    headers={"User-Agent": "AcademicResearchAgent/1.0 mailto:research-agent@example.com"},
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

---

## 4.10 ClinicalTrials.gov API v2

- **Use for:** registered clinical studies, interventions, sponsors, eligibility, study status, locations, and posted results.
- **Cost:** Free public API.
- **Key:** None.
- **Documentation:** https://clinicaltrials.gov/data-api/api
- **Endpoint:** `https://clinicaltrials.gov/api/v2/studies`

```python
import requests

response = requests.get(
    "https://clinicaltrials.gov/api/v2/studies",
    params={
        "query.cond": "depression",
        "query.intr": "cognitive behavioral therapy",
        "pageSize": 20,
        "format": "json",
    },
    timeout=30,
)
response.raise_for_status()
data = response.json()
```

A registry entry is not the same as a peer-reviewed results paper. Compare registration, protocol, posted results, and publication when assessing reporting bias.

---

# 5. Additional useful free public APIs

| API | Use | Key |
|---|---|---|
| [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) | Wikipedia/Wikidata-adjacent background and entity lookup | No key for ordinary public requests |
| [Wikidata Query Service](https://query.wikidata.org/) | Structured entities, identifiers, relationships, institutions, people | No key; use polite SPARQL queries |
| [Open Library API](https://openlibrary.org/developers/api) | Books, editions, authors, ISBNs | No key for public endpoints |
| [World Bank Indicators API](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information) | Development indicators and country data | No key |
| [GDELT](https://www.gdeltproject.org/) | Global news/event monitoring and analysis | No key for public services |
| [ORCID Public API](https://info.orcid.org/documentation/features/public-api/) | Researcher identifiers and public ORCID records | Free registration/credentials for the public API |
| [Research Organization Registry API](https://ror.readme.io/) | Standardized research-organization identities | Public API |
| [CORE API](https://core.ac.uk/services/api) | Repository metadata and open-access content | Public/free access subject to current rate and licensing terms |

---

# 6. APIs and tutorials to avoid or treat as outdated

## Google Custom Search JSON API

- Closed to new customers.
- Existing customers have 100 free queries per day.
- Google states that existing customers must transition before service discontinuation on **1 January 2027**.
- Do not build a new agent around it.

Official notice: https://developers.google.com/custom-search/v1/overview

## Bing Search APIs

Microsoft retired the standalone Bing Search APIs on **11 August 2025**. Old tutorials that tell you to create a Bing Search v7 resource are obsolete.

Official retirement notice: https://learn.microsoft.com/en-us/lifecycle/announcements/bing-search-api-retirement

## Unofficial Google Scholar scraping

Do not make direct Google Scholar scraping the foundation of a production agent. Expect CAPTCHA, IP blocks, unstable HTML, incomplete results, and terms-related risk.

---

# 7. Recommended API-routing rules for the agent

```yaml
routing_rules:
  current_web_information:
    primary: tavily
    fallback: exa

  exact_google_style_results:
    primary: serper
    fallback: serpapi
    warning: third_party_serp_provider

  broad_academic_discovery:
    primary: openalex
    fallback: semantic_scholar

  citation_graph:
    primary: semantic_scholar
    fallback: openalex

  doi_and_reference_verification:
    primary: crossref
    fallback: datacite

  lawful_open_access_lookup:
    primary: unpaywall
    fallbacks:
      - europe_pmc
      - doaj
      - core

  biomedical_literature:
    primary: pubmed
    fallback: europe_pmc

  biomedical_open_full_text:
    primary: europe_pmc
    fallback: pubmed_central

  preprints:
    primary: arxiv

  clinical_trials:
    primary: clinicaltrials_gov

  books:
    primary: open_library

  development_statistics:
    primary: world_bank_api
```

---

# 8. Environment-variable template

Never hard-code API keys in source code or commit them to Git.

```dotenv
# Web search
TAVILY_API_KEY=
EXA_API_KEY=
SERPER_API_KEY=
SERPAPI_KEY=
BRAVE_SEARCH_API_KEY=

# Scholarly discovery
OPENALEX_API_KEY=
SEMANTIC_SCHOLAR_API_KEY=
NCBI_API_KEY=

# Identification required by polite/open APIs
RESEARCH_AGENT_EMAIL=you@example.com
RESEARCH_AGENT_NAME=AcademicResearchAgent/1.0
```

Add `.env` to `.gitignore`:

```gitignore
.env
.env.*
!.env.example
```

---

# 9. Reliability requirements for an academic agent

Every agent using these APIs must follow these rules:

1. **Never treat a search snippet as the source itself.**
2. **Never claim full-text review when only metadata or an abstract was retrieved.**
3. **Verify DOI, title, author order, year, journal, volume, issue, and pages before citing.**
4. **Open and read the original source before making detailed methodological claims.**
5. **Label preprints, theses, reports, and non-peer-reviewed material accurately.**
6. **Check corrections, withdrawals, and retractions.**
7. **Use lawful full-text locations only.**
8. **Cache results to preserve credits and reduce load.**
9. **Implement timeouts, retry with exponential backoff, and respect `429` responses.**
10. **Log provider, query, date, result count, and source state.**
11. **Do not expose participant, manuscript, or confidential data in search queries.**
12. **Do not mix citation counts from different providers without naming the provider and retrieval date.**

Recommended source-state values:

```text
DISCOVERED
METADATA_VERIFIED
ABSTRACT_SCREENED
FULL_TEXT_ACCESSED
FULL_TEXT_READ
CRITICALLY_APPRAISED
EVIDENCE_EXTRACTED
CITATION_VERIFIED
```

---

# 10. Best practical choice

If you want the simplest setup, obtain these first:

1. **Tavily key** — general/current web search.
2. **OpenAlex key** — broad academic search.
3. **Semantic Scholar key** — citation and reference graph.
4. **NCBI key** — faster PubMed access, if your agents cover health topics.

Then use these without ordinary API keys:

5. **Crossref** — citation/DOI verification.
6. **Unpaywall** — lawful full text.
7. **Europe PMC** — biomedical literature/full text.
8. **arXiv** — preprints.
9. **DOAJ** — open-access journals/articles.
10. **DataCite** — datasets and non-Crossref DOI objects.

This gives an academic agent broad web access, literature discovery, citation verification, citation graphs, and legal full-text discovery without depending on Google Scholar scraping.
