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

  # Order Management System - Backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in the server root with:
   ```env
   MONGO_URI=mongodb://localhost:27017/order_management
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```
3. (Optional) Seed the database:
   ```sh
   node seed.js
   ```
4. Start the server in development mode:
   ```sh
   npm run dev
   ```
5. Access API docs at [http://localhost:5000/docs](http://localhost:5000/docs)

## Scripts

- `npm run dev` - Start with nodemon
- `npm start` - Start normally
- `node seed.js` - Seed the database with sample data

## Features

- Full CRUD for Orders, Products, Users
- Multi-item orders with inventory reservation (stock lock)
- Order status pipeline: PENDING → PAID → FULFILLED → CANCELLED
- Payment flag for each order
- Real-time order status updates via Socket.io
- Customer self-service: order lookup by ID
- Admin dashboard: CSV export of orders
- JWT Authentication and role-based access (admin, staff, customer)
- Rate limiting and security headers
- Health check endpoint: `/healthz`
- Swagger API documentation

## API Endpoints

- `/api/auth/register` - Register a new user
- `/api/auth/login` - Login and receive JWT
- `/api/orders` - CRUD for orders (admin/staff)
- `/api/orders/lookup/:orderId` - Customer order lookup
- `/api/orders/export/csv` - Export orders as CSV (admin)
- `/api/products` - CRUD for products (admin/staff)
- `/api/users` - CRUD for users (admin)
- `/healthz` - Health check

## Role-Based Access

- Only admins can manage users and delete products/orders.
- Staff can create/update products and orders.
- Customers can view their own orders.

## Deployment

- Set environment variables as shown above.
- Deploy to your preferred Node.js hosting (e.g., Railway, AWS, Heroku).

## High-Level Design

See [`../docs/high-level-design.md`](../docs/high-level-design.md) for architecture, ERD, and API contract.

