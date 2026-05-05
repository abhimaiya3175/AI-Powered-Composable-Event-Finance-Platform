# 📊 AI-Powered Composable Event Finance Platform

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)
![Deployment](https://img.shields.io/badge/Deployed-Render-46E3B7.svg)

> **Live Demo**: [ai-powered-composable-event-finance.onrender.com](https://ai-powered-composable-event-finance.onrender.com)

A full-stack AI-powered event finance management platform with real-time expense tracking, ML-based anomaly detection, OCR receipt verification, and role-based dashboards — all wrapped in a premium GitHub-dark UI.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 💰 **Budget Tracking** | Real-time KPI cards for total budget, spent, remaining, and burn-rate % |
| 📸 **AI Receipt OCR** | Tesseract.js reads receipt images and verifies the claimed amount |
| 🛡️ **Fraud Detection** | 3-tier pipeline: rule-based flags → ML anomaly (HuggingFace) → OCR mismatch |
| 📊 **Visual Analytics** | Donut chart (category split) + bar chart (spending trends) |
| 👤 **Role-Based UI** | Separate workspaces for Event Admins and Finance Managers |
| 📱 **Responsive Design** | Desktop, tablet, and mobile-ready with an off-canvas sidebar |

---

## 🏗️ Architecture & Technology Stack

```
Browser (Frontend) ──HTTP──► Express.js (Backend) ──► MongoDB Atlas
                                    │
                                    ├──► Cloudinary  (receipt image storage)
                                    ├──► HuggingFace (ML anomaly detection)
                                    └──► Tesseract.js (OCR verification)
```

| Layer | Technology | Hosting |
|-------|-----------|---------|
| **Frontend** | HTML5, Vanilla CSS (GitHub dark theme), JavaScript | Served by Express |
| **Backend** | Node.js 18+, Express.js 5 | Render (Free Tier) |
| **Database** | MongoDB Atlas + Mongoose 9 | MongoDB Atlas |
| **File Storage** | Cloudinary v2 + Multer (memory) | Cloudinary |
| **AI / OCR** | Tesseract.js 7 + HuggingFace Space | External APIs |

> **Single-server deployment**: Express serves the `frontend/` directory as static files, so one Render service runs both the API and the UI.

---

## 📁 Project Structure

```
AI-Powered-Composable-Event-Finance-Platform/
│
├── frontend/                    # Static frontend (served by Express)
│   ├── index.html               # Landing page with KPI counters & features
│   ├── roles.html               # Role selection (Admin / Finance Manager)
│   ├── dashboard.html           # Admin dashboard: charts, table, fraud alerts
│   ├── add-event.html           # Finance Manager: create events & log expenses
│   ├── config.js                # API discovery (auto-detects local/production)
│   ├── style.css                # 848-line design system (GitHub dark theme)
│   └── logo.png                 # Brand logo
│
├── backend/                     # Node.js REST API
│   ├── server.js                # Entry point; mounts routes, serves frontend
│   ├── db.js                    # MongoDB Atlas connection via Mongoose
│   ├── package.json             # Node dependencies & scripts
│   │
│   ├── models/
│   │   ├── Event.js             # Event schema: name, totalBudget, createdAt
│   │   ├── Expense.js           # Expense schema: eventId, amount, category, receiptUrl
│   │   └── User.js              # (reserved for future auth)
│   │
│   ├── routes/
│   │   ├── eventRoutes.js       # CRUD + 3-tier fraud check endpoint
│   │   └── expenseRoutes.js     # Add / list / delete expenses + Cloudinary upload
│   │
│   └── utils/
│       ├── fraudCheck.js        # Rule-based: budget, large expenses, missing receipts
│       ├── mlCheck.js           # ML anomaly via HuggingFace Space API
│       └── ocrCheck.js          # Tesseract.js receipt OCR amount verification
│
├── .env                         # ⚠️ DO NOT COMMIT — root-level env (not used by backend)
├── .gitignore
└── README.md
```

---

## 🔌 API Reference

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/events` | List all events |
| `POST` | `/events/create` | Create a new event `{ name, totalBudget }` |
| `GET` | `/events/check/:eventId` | Run 3-tier fraud check on all expenses for an event |
| `DELETE` | `/events/delete/:id` | Delete event and cascade-delete its expenses |

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/expenses/:eventId` | Get all expenses for an event |
| `POST` | `/expenses/add` | Add expense with optional receipt upload (multipart/form-data) |
| `DELETE` | `/expenses/delete/:id` | Delete a single expense |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Returns server status, MongoDB & Cloudinary config flags |

---

## 🚀 Getting Started

### Prerequisites

- **[Node.js](https://nodejs.org/)** v18 or newer
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** — free cluster + connection string
- **[Cloudinary](https://cloudinary.com/)** — free tier account (get your Cloud Name, API Key & API Secret from the dashboard)

### 1. Clone the Repository

```bash
git clone https://github.com/abhimaiya3175/AI-Powered-Composable-Event-Finance-Platform.git
cd AI-Powered-Composable-Event-Finance-Platform
```

### 2. Configure Environment Variables

Create `backend/.env` with your credentials:

```env
# MongoDB Atlas connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0

# Cloudinary — find your Cloud Name at console.cloudinary.com (top-left)
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server port (auto-fallback to 5001, 5002… in dev if port is busy)
PORT=5000
```

> **⚠️ Security**: Never commit `.env` files. They are already listed in `.gitignore`.

### 3. Install & Run

```bash
cd backend
npm install
npm start
```

**The full application will be running at:**
- App: `http://localhost:5000/`
- API: `http://localhost:5000/events`, `/expenses`, `/health`

The frontend `config.js` automatically detects whether it's running on localhost or in production, and routes API calls accordingly — no manual URL changes needed.

### 4. Navigation Flow

| Step | URL | Description |
|------|-----|-------------|
| 1 | `/` | Landing page with features & stats |
| 2 | `/roles.html` | Choose role: Event Admin or Finance Manager |
| 3 | `/dashboard.html` | Admin: load event by ID, view charts & fraud alerts |
| 4 | `/add-event.html` | Finance Manager: create events, add expenses, upload receipts |

---

## 🌍 Deployment Guide

### Render (Backend + Frontend — Single Service)

Since Express serves the frontend as static files, you only need **one Render Web Service**.

1. Push code to GitHub.
2. Go to [Render](https://render.com/) → **New Web Service** → connect your repo.
3. Set configuration:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment**, add these variables:

   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | Your MongoDB Atlas URI |
   | `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name (e.g. `dxyz12345`) |
   | `CLOUDINARY_API_KEY` | Your Cloudinary API key |
   | `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
   | `NODE_ENV` | `production` |

5. Deploy — Render will provide a live URL.

> **Important**: After pushing new commits to GitHub, trigger a **Manual Deploy** from the Render dashboard if auto-deploy is not configured.

### Verifying Deployment

After deploying, hit the health endpoint to confirm all services are connected:
```
https://your-app.onrender.com/health
```
Expected response:
```json
{
  "status": "ok",
  "mongo": true,
  "cloudinary": {
    "cloud_name": "your_cloud_name",
    "api_key_set": true,
    "api_secret_set": true
  },
  "node_env": "production"
}
```

---

## 🛡️ Fraud Detection Pipeline

When `GET /events/check/:eventId` is called, three checks run in sequence:

### Tier 1 — Rule-Based (`utils/fraudCheck.js`)
| Rule | Condition | Alert |
|------|-----------|-------|
| Over Budget | `totalSpent > totalBudget` | "Budget exceeded!" |
| High Unused | `remaining > 40% of budget` | "High unused funds: X%" |
| Large Expense | `expense > 30% of budget` | "Large expense detected" |
| Missing Receipt | `!expense.receiptUrl` | "Expense without receipt" |

### Tier 2 — ML Anomaly (`utils/mlCheck.js`)
Sends expense features (amount, budgetRatio, hasReceipt) to a [HuggingFace Space](https://huggingface.co/spaces/Geniusmp/event-anomaly-detector). Gracefully falls back if the API is unreachable.

### Tier 3 — OCR Verification (`utils/ocrCheck.js`)
Uses Tesseract.js to OCR each receipt image URL and checks if the claimed amount appears in the extracted text.

---

## 🐛 Known Issues & Fixes Applied

| Issue | Root Cause | Fix Applied |
|-------|-----------|-------------|
| Expense creation stuck on "Creating…" | Deployed `config.js` pointed to old dead Render URL | Replaced hardcoded URL with `window.location.origin` — always uses current domain |
| Receipt upload crashes server (502) | `upload_stream` callback error thrown in async context | Wrapped in proper `Promise` (`resolve`/`reject`) |
| Cloudinary upload fails silently | `cloud_name` value was placeholder `"event"` | Must match actual Cloudinary cloud name; check `/health` endpoint |

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch: `git checkout -b feature/YourFeature`
3. Commit your Changes: `git commit -m 'Add YourFeature'`
4. Push to the Branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License.

## 📬 Contact

For issues or questions, open a GitHub Issue in this repository.
