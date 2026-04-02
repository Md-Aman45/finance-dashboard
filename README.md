# 💰 Finance Dashboard Backend API

## 🚀 Overview

This project is a backend system for a finance dashboard that manages users, financial transactions, and provides analytical insights.

It is designed with a clean architecture, role-based access control, and real-world data handling in mind.
The goal of this project is to demonstrate strong backend fundamentals, not just feature implementation.

---

## 🧠 Key Highlights

* 🔐 JWT-based Authentication (No cookies, API-focused design)
* 🛡️ Role-Based Access Control (Viewer, Analyst, Admin)
* 📊 Data-Level Security (Users can only access permitted data)
* ⚙️ Clean Architecture (Controller → Service → Model)
* 📈 Aggregation APIs for dashboard insights
* 🧩 Simple, scalable, and maintainable codebase

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
| Admin   | Full CRUD access                                 |

---

## 💰 Transactions Module

* Create transaction
* Get all transactions (with pagination & filters)
* Get single transaction
* Update transaction (Admin only)
* Delete transaction (Soft delete)

### 🔍 Features

* Pagination (`page`, `limit`)
* Filtering (`type`, `category`)
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

* Expense/Income grouped by category

### 🔹 Monthly Trends

* Aggregated financial data by month

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
.env
```

---

## 📡 API Endpoints

### 🔑 Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

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

Use header:

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

3. Create `.env` file

   ```
   PORT=8080
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   ```

4. Run the server

   ```
   npm run dev
   ```

---

## 💡 Design Decisions

* Used JWT in headers instead of cookies for simplicity and API-first design
* Implemented both **route-level authorization** and **data-level filtering**
* Focused on clean, maintainable code rather than over-engineering

---

## 🏁 Conclusion

This project demonstrates a complete backend system with authentication, authorization, data management, and analytics.

The focus was on writing clean, understandable, and scalable code that reflects real-world backend practices.

---

## 👨‍💻 Author

**Md Aman**
