# 📊 Event Finance Manager

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

A full-stack event finance management application with expense tracking, receipt OCR, and fraud detection.

## ✨ Features
- **💰 Expense Tracking**: Easily add, edit, and categorize all event expenses.
- **📸 Receipt OCR**: Automatically extract text and amounts from receipts using OCR.
- **🛡️ Fraud Detection**: Intelligently flag suspicious or unusual expense submissions.
- **📈 Interactive Dashboard**: View insights visually with clear statistics and graphs.

## 🏗️ Architecture

| Layer | Technology | Hosting |
|-------|------------|---------|
| Frontend | HTML, CSS, JavaScript | Netlify (FREE) |
| Backend | Node.js, Express | Render (FREE) |
| Database | MongoDB Atlas | Cloud (FREE tier) |
| Storage | Cloudinary | Cloud (FREE tier) |

## 📁 Project Structure

```
Event Finance Manager/
├── frontend/          # Static frontend (deploy to Netlify)
│   ├── index.html
│   ├── dashboard.html
│   ├── add-event.html
│   ├── style.css
│   └── config.js      # API URL configuration
│
└── backend/           # Node.js API (deploy to Render)
    ├── server.js
    ├── db.js
    ├── package.json
    ├── models/
    ├── routes/
    └── utils/
```

## 🛠️ Prerequisites

- **Node.js**: v14.x or newer
- **MongoDB Atlas**: Free cluster URL for database
- **Cloudinary**: Free tier API keys for image storage

## 🚀 Deployment

### Backend (Render)
1. Push to GitHub
2. Connect Render to your repo
3. Set root directory: `backend`
4. Add environment variables from `.env`
5. Deploy!

### Frontend (Netlify)
1. Update `frontend/config.js` with your Render URL
2. Connect Netlify to your repo
3. Set publish directory: `frontend`
4. Deploy!

## 🔧 Local Development

```bash
# Backend
cd backend
npm install
npm start

# Frontend
# Open frontend/index.html in browser
# Or use Live Server extension
```

## 🔐 Environment Variables

Required for backend (set in Render dashboard):
- `MONGO_URI` - MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `FRONTEND_URL` (optional) - Netlify URL for CORS

## 📝 License

MIT
