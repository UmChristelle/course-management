# University Course Management Interface

A professional frontend dashboard for university supervisors to manage course catalogs.

## Tech Stack
- React 18 + Vite
- React Router v6
- Axios
- react-hot-toast
- Lucide React icons

## Setup & Run Locally

1. **Clone the repository**
```bash
   git clonehttps://github.com/UmChristelle/course-management
   cd course-management
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment**
   Create `.env` in project root:
```env
   VITE_API_BASE_URL=https://student-management-system-backend.up.railway.app
```

4. **Start the dev server**
```bash
   npm run dev
```
   Open [http://localhost:5173](http://localhost:5173)

## Login Credentials
- **Email:** admin@example.com
- **Password:** adminpassword123

## Deployment
The application is deployed on Vercel/Netlify for production use.

To deploy:
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform