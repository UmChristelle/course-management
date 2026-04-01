# University Course Management Interface

A fresh supervisor-facing frontend built from scratch for the assignment brief. The app authenticates against the provided backend and supports the full course CRUD workflow from a professional dashboard.

## Features

- Supervisor login using the provided test account
- Real API integration with `/api/auth/login` and `/api/courses`
- Create, list, search, inspect, update, and delete courses
- Success and error toast feedback with loading states
- Responsive dashboard layout for desktop and mobile

## Stack

- React
- Vite
- React Router
- Axios
- Lucide React
- react-hot-toast

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://student-management-system-backend.up.railway.app
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:5173`

## Demo Credentials

- Email: `admin@example.com`
- Password: `adminpassword123`

## Production Build

```bash
npm run build
```

The production files will be generated in `dist/` and can be deployed to Vercel, Netlify, or another static hosting provider.
