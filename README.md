# MERN Stack Portfolio Application — Arya A. Sutar

A clean, production-ready, and **viva-friendly MERN Stack Application** (MongoDB, Express.js, React 18, Node.js) built for **Arya A. Sutar** (B.Tech Computer Science & Engineering, 2023–2027).

Preserves 100% of the original **IDE / Terminal aesthetic**, design tokens, and animations, backed by a Node.js + Express REST API and a MongoDB database with Mongoose schemas.

---

## 🏛️ MERN Stack Architecture (Viva-Friendly Summary)

1. **React 18 + Vite (Frontend)**: Handles UI rendering, components (`Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Education`, `Achievements`, `Contact`), state management, and user interactions.
2. **Express.js (Server Framework)**: Handles HTTP requests, CORS headers, validation middleware, and REST API routing.
3. **Node.js (Backend Runtime)**: Runs the server application asynchronously.
4. **MongoDB (Database)**: Stores document collections for `projects`, `achievements`, `galleries`, `contacts`, and `admins`.
5. **Mongoose (ODM)**: Provides strict schema definition, field validation, and database query methods.
6. **REST API**: Connects the React client with the Express backend using standardized JSON endpoints (`/api/projects`, `/api/achievements`, `/api/gallery`, `/api/contact`, `/api/stats`).
7. **Contact Form Submission**: Validates user inputs (name, email, subject, message) and persists entries directly into MongoDB.
8. **Dynamic Content Fetching**: Projects and Achievements are fetched dynamically from MongoDB REST endpoints with seamless fallbacks.
9. **Dynamic Portfolio Statistics**: Calculated directly from MongoDB document counts (`Project.countDocuments()`, `Achievement.countDocuments()`, `Gallery.countDocuments()`, `Contact.countDocuments()`).
10. **Environment Variables**: `.env` protects database credentials (`MONGO_URI`), secret keys (`JWT_SECRET`), and server configuration (`PORT=5050`).

---

## 🔒 Production Environment Variables Breakdown

### 1. Vercel — Frontend (Client)
On Vercel, **ONLY** add this single frontend variable:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://YOUR-RENDER-BACKEND-URL.onrender.com/api` | Points React to your Render Express backend |

❌ **DO NOT ADD TO VERCEL**: `PORT`, `MONGO_URI`, `CLIENT_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_EMAIL`.

---

### 2. Render — Backend (Server)
On Render, add all your server-side environment variables:

```env
PORT=10000
NODE_ENV=production
MONGO_URI=mongodb+srv://arya_admin:<password>@portfolio-cluster.mongodb.net/portfolio_db?retryWrites=true&w=majority
CLIENT_URL=https://your-vercel-site.vercel.app

# SMTP Email Dispatch
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sutararya.6336@gmail.com
SMTP_PASSWORD=your_new_gmail_app_password
CONTACT_EMAIL=sutararya.6336@gmail.com
```

---

## 📁 Project Directory Structure

```text
portfolio/
├── client/                      # ⚛️ React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/          # Navbar, Hero, About, Skills, Projects, Achievements, Contact, Footer
│   │   ├── services/            # api.js (Fetch REST API client helper methods)
│   │   ├── data/                # Static fallback datasets
│   │   ├── index.css            # Preserved IDE styling tokens & responsive CSS
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/                  # Static assets (/assets/images, /assets/videos, /assets/resume)
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # 🚀 Node.js + Express.js + MongoDB Backend
│   ├── config/
│   │   └── db.js                # MongoDB Mongoose database connection
│   ├── models/
│   │   ├── Project.js           # Mongoose Project Schema
│   │   ├── Achievement.js       # Mongoose Achievement Schema
│   │   ├── Gallery.js           # Mongoose Gallery Schema
│   │   └── Contact.js           # Mongoose Contact Message Schema
│   ├── controllers/
│   │   ├── projectController.js # CRUD REST API logic for Projects
│   │   ├── achievementController.js # CRUD REST API logic for Achievements
│   │   ├── galleryController.js # GET, POST, DELETE REST API logic for Gallery
│   │   ├── contactController.js # POST & GET Contact Messages API
│   │   └── statsController.js   # Dynamic database counts API
│   ├── routes/
│   │   ├── projectRoutes.js     # /api/projects routes
│   │   ├── achievementRoutes.js # /api/achievements routes
│   │   ├── galleryRoutes.js     # /api/gallery routes
│   │   ├── contactRoutes.js     # /api/contact routes
│   │   └── statsRoutes.js       # /api/stats routes
│   ├── middleware/
│   │   ├── errorMiddleware.js   # Centralized error handler
│   │   └── authMiddleware.js    # JWT admin security header middleware
│   ├── services/
│   │   └── emailService.js      # Nodemailer SMTP email service
│   ├── seed.js                  # Pre-populated datasets for Projects, Achievements, Gallery
│   ├── server.js                # Main Express server listener (Port 5050)
│   └── package.json
│
├── .env                         # Environment variables (Mongo URI, Port, Secrets)
├── .env.example
├── .gitignore
└── README.md
```

---

## 🛠️ How to Run & Test locally

### 1. Start Express Backend Server
```bash
cd server
npm install
npm run dev
```

### 2. Start React Frontend Client
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`.
