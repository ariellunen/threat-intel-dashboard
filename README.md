# Threat Intelligence Dashboard

A full-stack application built with **React (frontend)** and **Node.js/Express (backend)**.  
The app allows users to input an IP address and get threat intelligence data from multiple providers: **VirusTotal**, **AbuseIPDB**, and **IPQualityScore**.  

---

## Features
- Enter an IP address and fetch threat reputation data.
- View abuse reports, reputation scores, and metadata.
- Backend integrates with external APIs.
- Frontend React dashboard for displaying results.
- Backend includes test files using Jest + Supertest.

---

## Project Structure
├── backend/ # Express server, API integrations, tests
├── frontend/ # React app, UI components
├── .env # Environment variables (with provided API keys)
├── .env.example # Example file for your own keys
├── .gitignore
└── README.md

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

2. Install dependencies:
Backend:
cd backend
npm install
Frontend:
cd ../frontend
npm install
Environment configuration:
A .env file is already included in the backend/ directory with the API keys provided in the assignment.
You may use these keys directly or replace them with your own.
Example .env (already included):

PORT=5000
VirusTotal_API_KEY=24843ad16c9a826921b437c1c1ef723323d303ce4494c5216939218ed313690b
IPQualityScore_API_KEY=CwMvwA3FvaqiuIZjmPoJ9v8y1OhHHxID
ABUSEIPDB_API_KEY=c1083edbc608e5aa55626004c4c957f029a1fa596fad70aa2ff9bc13c332ae06fca3bbdef683f1db

If you prefer, you can also copy .env.example and add your own API keys.

Running the Application
Start the backend:
cd backend
npm start
Start the frontend (in another terminal):
cd frontend
npm start
Backend: http://localhost:5000
Frontend: http://localhost:3000 (connects to backend automatically)

API Endpoints (Backend)
GET /api/intel?ip=<IP_ADDRESS>
Returns threat intelligence data for the given IP from VirusTotal, AbuseIPDB, and IPQualityScore.

Running Tests
Backend tests:
cd backend
npm test
Frontend tests (if included):
cd frontend
npm test
Development Notes
The .env file includes the assignment API keys so setup is quick.
Backend uses Express and fetches data from external services.
Frontend is a React app providing a simple dashboard for results.
Tradeoffs: No caching layer or advanced error handling to keep solution simple.


