# ApplyLog

A clean, minimal job application tracker built with React. Track every application from first apply to final offer — all in one place.

🔗 **Live Demo**: [applylog-one.vercel.app](https://applylog-one.vercel.app)

---

## Features

* **Kanban Board** — Drag and drop applications across Applied, Interview, Offer, and Rejected columns
* **Application Cards** — Store company, role, apply date, job URL, and personal notes per application
* **Status Management** — Move applications via drag-and-drop or the inline dropdown
* **Dashboard Stats** — At-a-glance counts for total, active, interviews, and offers
* **Authentication** — Secure login and per-user data
* **Persistent Storage** — All applications saved to a backend database

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* shadcn/ui
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## Project Structure

```id="tree-struct"
applylog/
├── client/     # Frontend (React)
└── server/     # Backend (Express)
```

---

## Setup

### 1. Clone the repository

```id="clone-cmd"
git clone https://github.com/your-username/applylog.git
cd applylog
```

---

### 2. Backend Setup

```id="backend-setup"
cd server
npm install
```

Create a `.env` file inside `server/`:

```id="backend-env"
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```id="backend-run"
npm run dev
```

---

### 3. Frontend Setup

```id="frontend-setup"
cd ../client
npm install
npm run dev
```

Create a `.env` file inside `client/`:

```id="frontend-env"
VITE_API_URL=http://localhost:5000
```

---

## Deployment

* Frontend → Vercel
* Backend → Render / Railway

---
