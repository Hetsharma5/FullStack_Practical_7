# 💎 LuxeStore - Premium E-Commerce Solution

LuxeStore is a sophisticated, full-stack e-commerce application designed for high-end lifestyle products. It features a robust architecture, secure authentication, and a premium user experience.

---

## ✨ Key Features

### 🛒 Shopping Experience
- **Refined Collection**: Browse through a curated grid of premium products.
- **Dynamic Detail Views**: Deep-dive into product specifications and availability.
- **Robust Cart Management**: Persistent cart with real-time quantity controls and subtotal calculations.
- **Simulated Checkout**: A realistic payment simulation with randomized success/failure feedback.

### 🔐 Security & Auth
- **JWT Authentication**: Stateless session management with JSON Web Tokens.
- **Role-Based Access Control**: Separate workflows for Standard Users and **Admins**.
- **Password Security**: Robust hashing using `bcryptjs`.

### 🛠 Admin Dashboard
- **Local Asset Management**: Upload product images directly to a local `/uploads` directory using `multer`.
- **Inventory Control**: Comprehensive form for managing stock, pricing, and descriptions.
- **Private Routes**: Admin actions are strictly protected by server-side middleware.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite), React Router DOM, Axios, Context API (State Management).
- **Backend**: Node.js, Express, MongoDB (Mongoose), Multer (File Uploads), JWT.
- **Styling**: Vanilla CSS (Custom Premium Design System), Google Fonts (Inter).

---

## 🛠 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### 1. Installation
Clone the repository and install dependencies for both layers:

```bash
# Main project / Frontend
npm install

# Backend
cd server
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 3. Running the App
From the **root directory**, you can run both parts:

- **Start Backend**: `npm run server`
- **Start Frontend**: `npm run dev`

---

## 👔 Admin Workflow (How to use)

1. **Register Admin**: Go to `/signup` and select "Admin" in the account type dropdown.
2. **Access Dashboard**: Once logged in, an **"Add Product"** link will appear in the navigation bar.
3. **Upload Products**: Use the dashboard to fill in product details and upload an image from your computer.
4. **Live Catalog**: New products will appear instantly in the store grid once uploaded.

---

## 📂 Project Structure

```text
├── server/             # Express Backend
│   ├── config/         # DB Connection
│   ├── controllers/    # API Logic
│   ├── models/         # Mongoose Schemas
│   ├── middleware/     # Auth & Upload filters
│   ├── routes/         # Endpoint definitions
│   └── uploads/        # Local Image Storage
└── src/                # React Frontend
    ├── components/     # UI Views (Store, Cart, Auth)
    ├── context/        # State (Cart, Auth)
    └── services/       # API (Axios Instance)
```

---


## 📄 License
Academic Project for FSD. Created By Het Sharma
