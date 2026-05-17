# Akshay Portfolio Deployment

## Local setup

1. Install root dependencies:
   `npm install`
2. Install backend dependencies:
   `cd backend && npm install`
3. Start backend:
   `npm run dev`
4. Open `index.html` or serve it with any static server.

## Backend environment

Set these variables on Render:

- `MONGO_URI`
- `PORT=5000`
- `CLIENT_URL=https://your-vercel-domain.vercel.app`
- `MAIL_TO=akshaykalakonda9@gmail.com`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` for email delivery

Suggestions are always stored in MongoDB. Email delivery starts once SMTP variables are configured.

## Render backend

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`

## Vercel frontend

- Deploy the repository root as a static site.
- Set your API URL in the frontend runtime by adding a small inline config before `assets/js/api.js` if needed:
  `<script>window.PORTFOLIO_API_URL="https://your-render-api.onrender.com"</script>`

## MongoDB seed

After backend is running:

`POST https://your-render-api.onrender.com/api/projects/seed`
