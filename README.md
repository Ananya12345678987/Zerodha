# Zerodha Clone

A full-stack clone of Zerodha's trading platform, built to practice real-world
architecture patterns: separate frontend, dashboard, and backend services,
authentication, and live deployment.

## Live Demo
- Frontend (Login/Signup): https://zerodha-frontend-seven-pied.vercel.app
- Dashboard: https://zerodha-dashboard-sigma-peach.vercel.app

## Project Structure
- **frontend/** — Login and signup interface (React)
- **dashboard/** — Post-login trading dashboard (React)
- **backend/** — Node.js/Express API with MongoDB (deployed on Render)

## Tech Stack
- React (Create React App)
- Node.js / Express
- MongoDB
- Vercel (frontend/dashboard hosting)
- Render (backend hosting)

## Features
- User authentication (signup/login) with token-based sessions
- Cross-service redirect flow: successful login on the frontend redirects
  into the dashboard, already authenticated
- Environment-based configuration for local development vs. production

## Running Locally
Each folder (`frontend`, `dashboard`, `backend`) has its own `package.json`.
From within each folder:

\`\`\`bash
npm install
npm start
\`\`\`

Set the following environment variables for local development:
- `REACT_APP_BACKEND_URL` (frontend/dashboard) — defaults to `http://localhost:3002`
- `REACT_APP_DASHBOARD_URL` (frontend) — defaults to `http://localhost:3001`
