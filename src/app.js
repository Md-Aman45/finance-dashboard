const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const transactionRouter = require('./routes/transaction.routes');
const { protect } = require('../src/middlewares/auth.middleware');
const { authorize } = require('../src/middlewares/role.middleware');


const app = express();

// Middleware...
app.use(express.json());
app.use(cors());


// routes...
app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);


// Test route to verify authentication middleware...
app.get("/test", protect, (req, res) => {
  res.json({ user: req.user });
});


// Test route to verify role-based authorization middleware...
app.get("/admin-test", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});


module.exports = app;