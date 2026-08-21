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

## 🌐 Express REST API Endpoints

### 1. Contact API
- `POST /api/contact` — Validate & store visitor contact message in MongoDB
- `GET /api/contact` — Retrieve all stored contact messages for admin/private side

### 2. Projects API
- `GET /api/projects` — Fetch all portfolio projects from MongoDB
- `GET /api/projects/:id` — Fetch single project by ID
- `POST /api/projects` — Create a new project item in MongoDB
- `PUT /api/projects/:id` — Update existing project in MongoDB
- `DELETE /api/projects/:id` — Delete project from MongoDB

### 3. Achievements API
- `GET /api/achievements` — Fetch all honors & achievements from MongoDB
- `POST /api/achievements` — Create a new achievement in MongoDB
- `PUT /api/achievements/:id` — Update existing achievement in MongoDB
- `DELETE /api/achievements/:id` — Delete achievement from MongoDB

### 4. Gallery API
- `GET /api/gallery` — Fetch gallery items from MongoDB
- `POST /api/gallery` — Create gallery item (title, category, image URL, description)
- `DELETE /api/gallery/:id` — Delete gallery item from MongoDB

### 5. Portfolio Statistics API
- `GET /api/stats` — Calculate live database document counts (`projects`, `achievements`, `gallery`, `messages`)

---

## ⚙️ Environment Configuration

Create or verify `.env` in the root and `/server` folder:

```env
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=sutararya.6336@gmail.com
ADMIN_PASSWORD=AryaSutarAdmin@2026!
JWT_SECRET=arya_sutar_jwt_private_key_secure_2026
```

---

## 🛠️ How to Run & Test the Application

### 1. Start MongoDB Database
Ensure MongoDB Community Server is running on your machine:
```bash
# Verify local MongoDB service
mongod
```

### 2. Start Express Backend Server
In the server terminal:
```bash
cd server
npm install
npm run dev
```
Output:
`[Express Backend] Server listening on http://localhost:5050`
`[MongoDB] Connected successfully: 127.0.0.1`

### 3. Start React + Vite Frontend Client
In a new terminal:
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`.

### 4. Test API Endpoints
You can test the APIs in PowerShell or browser:

```powershell
# Health Check
Invoke-RestMethod -Uri 'http://localhost:5050/api/health'

# Portfolio Stats
Invoke-RestMethod -Uri 'http://localhost:5050/api/stats'

# Fetch Projects
Invoke-RestMethod -Uri 'http://localhost:5050/api/projects'

# Submit Contact Message
$body = @{ name='Visitor Name'; email='visitor@example.com'; subject='Internship Opportunity'; message='Hello Arya' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:5050/api/contact' -Method Post -Body $body -ContentType 'application/json'
```
