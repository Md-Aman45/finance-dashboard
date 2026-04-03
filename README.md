# 💰 Finance Dashboard Backend API

## 🚀 Overview

This project is a backend system for a finance dashboard that manages users, financial transactions, and provides analytical insights.

It is built with a clean, scalable architecture and focuses on real-world backend practices such as authentication, authorization, and data-level security.

---

## 🧠 Key Highlights

* 🔐 JWT-based Authentication (stateless, header-based)
* 🛡️ Role-Based Access Control (Viewer, Analyst, Admin)
* 🔒 Data-Level Security (users access only permitted data)
* ⚙️ Clean Architecture (Controller → Service → Model)
* 📊 Aggregation APIs for dashboard analytics
* 🧩 Simple, maintainable, and scalable codebase

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Architecture:** Layered (Controller → Service → Model)

---

## 🔐 Authentication & Roles

| Role    | Permissions                                      |
| ------- | ------------------------------------------------ |
| Viewer  | Create & view own transactions                   |
| Analyst | Create, view all transactions + dashboard access |
| Admin   | Full CRUD + user management                      |

---

## 👥 User Management (Admin Only)

* Get all users
* Get user by Id
* Update user role (viewer / analyst / admin)
* Activate / deactivate users

---

## 💰 Transactions Module

* Create transaction
* Get all transactions (with pagination & filters)
* Get single transaction (secure access)
* Update transaction (Admin only)
* Delete transaction (Soft delete)

### 🔍 Features

* Pagination (`page`, `limit`)
* Filtering (`type`, `category`, `date range`)
* Role-based data visibility:

  * Viewer → only own data
  * Analyst/Admin → all data

---

## 📊 Dashboard APIs

### 🔹 Summary

* Total Income
* Total Expense
* Balance

### 🔹 Category Breakdown

* Grouped financial data by category

### 🔹 Monthly Trends

* Aggregated data by month and year

👉 Access restricted to **Analyst & Admin only**

---

## 🧱 Project Structure

```
src/
 ├── config/
 ├── models/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middleware/
 └── app.js

server.js
.env.example
.gitignore
README.md
```

---

## 📡 API Endpoints

### 🔑 Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

---

### 👥 Users (Admin)

* `GET /api/users`
* `GET /api/users/:id`
* `PATCH /api/users/:id/role`
* `PATCH /api/users/:id/status`

---

### 💰 Transactions

* `POST /api/transactions/create`
* `GET /api/transactions`
* `GET /api/transactions/:id`
* `PUT /api/transactions/update/:id` (Admin)
* `DELETE /api/transactions/remove/:id` (Admin)

---

### 📊 Dashboard

* `GET /api/dashboard/summary`
* `GET /api/dashboard/category`
* `GET /api/dashboard/trends`

---

## 🧪 Testing

All APIs can be tested using Postman.

Use Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚙️ Setup Instructions

1. Clone the repository

2. Install dependencies

```
npm install
```

3. Create `.env` file using `.env.example`

Copy `.env.example` and rename it to `.env`, then update values:

```
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

```

4. Run the server

```
# Development 
npm run dev

# Production 
npm start

```

---

## 💡 Design Decisions

* Used JWT in headers instead of cookies for simplicity and API-first design
* Implemented **route-level authorization** (RBAC)
* Applied **data-level filtering** for secure data access
* Focused on clarity and maintainability instead of over-engineering

---

## 🏁 Conclusion

This project demonstrates a complete backend system with authentication, authorization, user management, transaction handling, and analytics.

It reflects practical backend design with a focus on clean structure and real-world usability.

---

## 👨‍💻 Author

**Md Aman**
