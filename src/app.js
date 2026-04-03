const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const transactionRouter = require('./routes/transaction.routes');
const dashboardRouter = require('./routes/dashboard.routes');
const { protect } = require('../src/middlewares/auth.middleware');
const { authorize } = require('../src/middlewares/role.middleware');


const app = express();


// Middleware...
app.use(express.json());
app.use(cors());



// routes...
/**
 * Auth routes are accessible to all authenticated users (Admin, Analyst, Viewer).
*/
app.use("/api/auth", authRouter);

/**
 * User routes are accessible to all authenticated users (Admin).
*/
app.use("/api/users", userRouter);

/**
 * Transaction routes are accessible to all authenticated users (Admin, Analyst, Viewer).
*/
app.use("/api/transactions", transactionRouter);

/**
 * Dashboard routes are accessible only to Admin and Analyst. Viewers do not have access to dashboard routes.
*/
app.use("/api/dashboard", dashboardRouter);







// Test route to verify authentication middleware...
app.get("/test", protect, (req, res) => {
  res.json({ user: req.user });
});



// Test route to verify role-based authorization middleware...
app.get("/admin-test", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});





module.exports = app;