# ApplyLog

A clean, minimal job application tracker built with React. Track every application from first apply to final offer — all in one place.

🔗 **Live Demo**: [applylog-one.vercel.app](https://applylog-one.vercel.app)

---

## Features

- **Kanban Board** — Drag and drop applications across Applied, Interview, Offer, and Rejected columns
- **Application Cards** — Store company, role, apply date, job URL, and personal notes per application
- **Status Management** — Move applications via drag-and-drop or the inline dropdown
- **Dashboard Stats** — At-a-glance counts for total, active, interviews, and offers
- **Authentication** — Secure JWT-based login and per-user data
- **Persistent Storage** — All applications saved to MongoDB

---

## Tech Stack

| Layer     | Tech                                                   |
|-----------|--------------------------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS, shadcn/ui, React Router  |
| Backend   | Node.js, Express 5, MongoDB, Mongoose, JWT             |
| Deployment| Vercel (frontend) · Railway (backend)                  |

---

## Project Structure

```
applylog/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── api/     # fetch wrappers (auth, jobs, boards)
│   │   ├── components/
│   │   ├── context/ # AuthContext
│   │   ├── hooks/
│   │   └── pages/
│   └── .env.example
│
└── server/          # Express backend
    ├── middleware/  # JWT auth middleware
    ├── models/      # Mongoose models (User, Job)
    ├── routes/      # auth, jobs
    ├── server.js
    └── .env.example
```

---

## Local Development

### Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB — either [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier, recommended) or a local install

---

### 1. Clone the repo

```bash
git clone https://github.com/vinod765/applylog.git
cd applylog
```

---

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Open `server/.env` and fill in:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/applylog   # or your Atlas URI
JWT_SECRET=replace_with_random_string
CLIENT_URL=http://localhost:5173
```

> **Generate a JWT secret:**
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

Start the backend:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`. You should see `ApplyLog API running` at that URL.

---

### 3. Frontend setup

Open a new terminal:

```bash
cd client
npm install
cp .env.example .env
```

`client/.env` should have:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Deployment

### Backend → Railway

1. Go to [railway.com](https://railway.com) → sign in with GitHub
2. **New Project → Deploy from GitHub Repo** → select `applylog`
3. In the service settings, set **Root Directory** to `server`
4. Go to the **Variables** tab and add:

   | Key          | Value                                         |
   |--------------|-----------------------------------------------|
   | `MONGO_URI`  | Your MongoDB Atlas connection string          |
   | `JWT_SECRET` | A long random string                          |
   | `CLIENT_URL` | `https://your-app.vercel.app`                 |

   > Leave `PORT` blank — Railway injects it automatically.

5. **Settings → Networking → Public Networking → Generate Domain**
6. Copy your Railway URL (e.g. `https://applylog-production.up.railway.app`)

---

### Frontend → Vercel

1. Go to your Vercel project → **Settings → Environment Variables**
2. Add:

   | Key            | Value                                          |
   |----------------|------------------------------------------------|
   | `VITE_API_URL` | `https://applylog-production.up.railway.app`   |

3. **Redeploy** from the Deployments tab.

---

### MongoDB Atlas (recommended for production)

1. Create a free M0 cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a database user
3. **Network Access → Add IP → `0.0.0.0/0`** (required for Railway)
4. **Connect → Drivers** → copy the URI, replace `<password>`
5. Use this as `MONGO_URI` everywhere

---

## Environment Variables Reference

### `server/.env`

| Variable     | Required | Description                                      |
|--------------|----------|--------------------------------------------------|
| `PORT`       | No       | Defaults to 5000. Set automatically by Railway   |
| `MONGO_URI`  | Yes      | MongoDB connection string                        |
| `JWT_SECRET` | Yes      | Secret key for signing JWT tokens                |
| `CLIENT_URL` | Yes      | Frontend origin for CORS — no trailing slash     |

### `client/.env`

| Variable       | Required | Description                          |
|----------------|----------|--------------------------------------|
| `VITE_API_URL` | Yes      | Backend base URL — no trailing slash |

---

## API Endpoints

### Auth

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/auth/register` | Register new user    |
| POST   | `/api/auth/login`    | Login, returns JWT   |

### Jobs *(all require `Authorization: Bearer <token>` header)*

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| GET    | `/api/jobs`     | Get all jobs for user |
| POST   | `/api/jobs`     | Create a new job      |
| PUT    | `/api/jobs/:id` | Update a job          |
| DELETE | `/api/jobs/:id` | Delete a job          |

---