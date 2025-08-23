# Copilot Instructions

This repository contains a full-stack **Threat Intelligence Dashboard** with a React frontend and Express backend.

---

## Backend (backend/ folder)

- **Entry point**: `server.js`
- **Framework**: Express.js (with CORS enabled for `localhost:3000`)
- **Main endpoint**: `GET /api/intel?ip=<IP_ADDRESS>`
- **External APIs**: AbuseIPDB, VirusTotal, ProxyCheck
- **Testing**: Jest + Supertest (`server.test.js`)
- **Environment**: `.env` file with API keys (`ABUSEIPDB_API_KEY`, `VIRUSTOTAL_API_KEY`)

**API Response Format (example)**:

```json
{
  "ip": "8.8.8.8",
  "hostname": "Google LLC",
  "isp": "Google",
  "country": "US",
  "city": "Mountain View",
  "abuseScore": 0,
  "recentReports": 0,
  "vpnOrProxy": false,
  "threatScore": 5
}
```

---

## Frontend (frontend/ folder)

- **Entry point**: `src/index.js`
- **Framework**: React (with Material-UI)
- **Main component**: `IntelDashboard`
- **API calls**: Made using Axios
- **State management**: React Context API
- **Testing**: Jest + React Testing Library

---

## when adding new features or components

- Follow the existing folder structure
- Create separate files for new components
- Update the main component (`IntelDashboard`) to include new features
- Write tests for new functionality
- Use Material-UI for consistent styling
