# Alankarini Mehndi Art

Monorepo-style layout:

- `frontend/` contains the Vite + React site
- `backend/` contains the Express + Neon-ready API scaffold

## Frontend

Run the site from the repo root:

```bash
npm run dev
```

Build the frontend:

```bash
npm run build
```

### Vercel deployment

Deploy the `frontend/` folder as the Vercel project root.

Set this environment variable in Vercel:

```bash
VITE_API_BASE_URL=https://your-render-service.onrender.com
```

## Backend

Set up `backend/.env` from `backend/.env.example`, then run:

```bash
npm run dev:backend
```

### Render deployment

Deploy the `backend/` folder as the service root.

Set these environment variables in Render:

```bash
DATABASE_URL=your-neon-postgres-connection-string
CORS_ORIGIN=https://your-vercel-project.vercel.app
```

## Database

The backend is prepared for Neon/PostgreSQL through `DATABASE_URL`.
Use your Neon connection string in `backend/.env` when you are ready.
