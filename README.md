# 📊 AI-Powered Composable Event Finance Platform

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

A comprehensive, full-stack event finance management application designed to streamline expense tracking, leverage AI for receipt OCR, and provide intelligent fraud detection. This platform offers a seamless experience for managing budgets, expenses, and financial health for any event.

## 🌟 About the Project

The AI-Powered Composable Event Finance Platform addresses the complexities of event budgeting by providing an intuitive interface paired with robust backend services. It is built to be modular (composable) and leverages artificial intelligence to automate mundane tasks like data entry from receipts while ensuring the integrity of financial data through automated fraud checks.

### ✨ Key Features

- **💰 Comprehensive Expense Tracking**: Easily add, edit, categorize, and monitor all event-related expenses in real-time.
- **📸 AI Receipt OCR**: Automatically extract crucial information (text, amounts, dates, vendors) from uploaded receipts using advanced Optical Character Recognition (OCR), reducing manual entry errors.
- **🛡️ Intelligent Fraud Detection**: Automatically flag suspicious or unusual expense submissions (e.g., duplicate receipts, amounts exceeding typical thresholds) to maintain financial integrity.
- **📈 Interactive & Dynamic Dashboard**: Visualize your financial data with clear, interactive statistics, charts, and graphs for immediate insights into budget utilization.
- **📱 Responsive Design**: Fully responsive web interface ensuring accessibility across desktop, tablet, and mobile devices.

## 🏗️ Architecture & Technology Stack

The application follows a decoupled client-server architecture, enabling independent scaling and development of the frontend and backend.

| Component | Technology | Description / Hosting |
|-----------|------------|-----------------------|
| **Frontend** | HTML5, CSS3 (Vanilla), JavaScript | Lightweight, fast static frontend. Hosted on Netlify (Free Tier). |
| **Backend** | Node.js, Express.js | RESTful API server handling business logic. Hosted on Render (Free Tier). |
| **Database** | MongoDB Atlas | NoSQL cloud database for flexible data modeling. |
| **Storage** | Cloudinary | Cloud service for secure image (receipt) uploading and management. |
| **AI/OCR** | Custom Integration | Services handling the OCR and fraud detection logic. |

## 📁 Project Structure

```text
AI-Powered-Composable-Event-Finance-Platform/
├── frontend/                 # Static frontend web application
│   ├── index.html            # Landing / Login page
│   ├── dashboard.html        # Main dashboard view
│   ├── add-event.html        # Interface for adding new events/expenses
│   ├── style.css             # Global and component styles
│   └── config.js             # Environment & API URL configuration
│
├── backend/                  # Node.js RESTful API
│   ├── server.js             # Application entry point
│   ├── db.js                 # Database connection setup
│   ├── package.json          # Node dependencies and scripts
│   ├── models/               # Mongoose database schemas
│   ├── routes/               # API route definitions
│   └── utils/                # Helper functions (OCR, validation)
│
├── .env                      # Environment variables (Do not commit!)
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

## 🚀 Getting Started (How to Run Everything)

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 🛠️ Prerequisites

Before you begin, ensure you have the following installed and set up:
- **[Node.js](https://nodejs.org/)**: Version 18.x or newer.
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**: A free cluster and your connection string (URI).
- **[Cloudinary](https://cloudinary.com/)**: A free tier account to obtain your API keys for image storage.
- **Git**: For cloning the repository.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Powered-Composable-Event-Finance-Platform.git
cd AI-Powered-Composable-Event-Finance-Platform
```

### 2️⃣ Environment Variables Setup

You need to configure the environment variables for the backend to connect to the database and external services.

1. Create a file named `.env` in the `backend` directory.
2. Add the following keys and replace the placeholder values with your actual credentials:

```env
# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# Cloudinary Credentials (for receipt image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Port (Optional, defaults to 5000; will fallback to 5001 if 5000 is busy)
PORT=5000
```

> **Security Note**: Never commit your `.env` file to version control. It is included in `.gitignore` by default.

### 3️⃣ Running the Integrated Application (Backend + Frontend)

The backend server automatically serves the frontend static files from the `frontend/` directory.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm start
```

**The full application will be running at:**
- **Frontend**: `http://localhost:5000/` or `http://localhost:5001/` (if 5000 is busy)
- **API Endpoints**: `http://localhost:5000/events`, `http://localhost:5000/expenses`, etc.

The frontend automatically detects the backend API and falls back through multiple ports (5001, 5000, and 127.0.0.1 variants) to find the live server.

### 4️⃣ Navigation Flow

1. **Homepage** (`/`): Landing page with features and call-to-action buttons
2. **Roles Selection** (`/roles.html`): Choose between Event Admin or Finance Manager
3. **Event Admin Dashboard** (`/dashboard.html`): View events, budget stats, expense breakdown, and fraud alerts
4. **Finance Manager Workspace** (`/add-event.html`): Create events, add expenses, upload receipts

All pages link through the navbar and are accessible from the backend-served URL.

## 🌍 Deployment Guide

### Backend (Render)
1. Push your code to a GitHub repository.
2. Create an account on [Render](https://render.com/).
3. Create a new "Web Service" and connect your GitHub repository.
4. Set the **Root Directory** to `backend`.
5. Set the **Build Command** to `npm install`.
6. Set the **Start Command** to `npm start`.
7. In the "Environment" tab, add all the variables from your `.env` file.
8. Deploy! Render will provide a live URL for your API.

### Frontend (Netlify)
1. Update the API base URL in `frontend/config.js` to point to your new Render backend URL.
2. Create an account on [Netlify](https://netlify.com/).
3. Click "Add new site" -> "Import an existing project".
4. Connect your GitHub repository.
5. Set the **Publish directory** to `frontend`.
6. Deploy! Netlify will provide a live URL for your frontend.

## 🤝 Contributing

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See the `LICENSE` file for more information (if applicable).

## 📬 Contact

For inquiries or support, please open an issue in the repository.
