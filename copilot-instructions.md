# Copilot Instructions

This repository contains a full-stack project with a React frontend and an Express backend.

## Backend

- Located in the `backend/` folder
- Entry point: `server.js`
- Uses Express for API routes
- Main endpoint: `GET /api/intel?ip=<IP_ADDRESS>`
- Tests are written with Jest and Supertest
- Environment variables are loaded from `.env` in the backend folder

## Frontend

- Located in the `frontend/` folder
- Built with React
- Uses Material-UI for components
- Calls backend API at `http://localhost:5000/api/intel`

## Notes

- Always validate IP format before sending requests
- Use async/await for API calls
- Follow the project structure when adding new components or routes
