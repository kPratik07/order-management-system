# Order Management System - Frontend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- React 19 + Vite
- Tailwind CSS
- React Router v7
- Axios for API calls
- Context API for auth
- Custom hooks and reusable components

## Environment Variables

- Create a `.env` file for API URLs, e.g.:
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```
