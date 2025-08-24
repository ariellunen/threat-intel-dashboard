# Threat Intelligence Dashboard

A full-stack application built with **React (frontend)** and **Node.js/Express (backend)**.  
The app allows users to input an IP address and get threat intelligence data from multiple providers: **VirusTotal** and **AbuseIPDB**

---

## Features

- Enter an IP address and fetch comprehensive threat intelligence data
- View abuse reports, reputation scores, and geolocation metadata
- Clean Material-UI dashboard with risk level indicators
- Backend integrates with multiple threat intelligence APIs
- Comprehensive test suite using Jest + Supertest
- Real-time results with historical lookup storage (last 10 searches)

---

## Prerequisites

- Node.js (>= 18)
- npm or yarn

---

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/ariellunen/threat-intel-dashboard.git
cd threat-intel-dashboard
```

2. Install dependencies:
   Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

3. Environment configuration: create a .env file is already included in the backend/ directory with the API keys provided in the assignment.
   You may use these keys directly or replace them with your own.
   Example .env (already included):

```bash
PORT=5000
VirusTotal_API_KEY=24843ad16c9a826921b437c1c1ef723323d303ce4494c5216939218ed313690b
ABUSEIPDB_API_KEY=c1083edbc608e5aa55626004c4c957f029a1fa596fad70aa2ff9bc13c332ae06fca3bbdef683f1db
```

---

## Running the Application

1. Start the backend:

```bash
cd backend
npm start
```

2. Start the frontend (in another terminal):

```bash
cd frontend
npm start
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000 (connects to backend automatically)

---

## API Endpoints (Backend)

### Get IP Intelligence

**Request**

GET /api/intel?ip=<IP_ADDRESS>

**Example**

```bash
curl "http://localhost:5000/api/intel?ip=8.8.8.8"
```

Returns aggregated threat intelligence data for the given IP address.

## Example Response:

```bash
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

## External APIs Used

- **VirusTotal** – provides IP reputation and threat analysis based on data from multiple security vendors.
- **AbuseIPDB** – community-driven database that tracks abusive IP addresses, reporting abuse scores and recent activity.

**The backend queries these APIs and combines the results into a single, clean JSON response for the frontend.**

---

## Running Tests

Backend tests:

```bash
cd backend
npm test
```

Frontend tests:

```bash
cd frontend
npm test
```

---

## Development Notes

- Material-UI provides consistent styling across components
- Tests cover both happy path and error scenarios
- Error handling gracefully manages API failures
- Component-based architecture for maintainability
