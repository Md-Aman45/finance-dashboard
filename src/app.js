const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const { protect } = require('../src/middlewares/auth.middleware');


const app = express();

// Middleware...
app.use(express.json());
app.use(cors());


// routes...
app.use("/api/auth", authRouter);


// Test route to verify authentication middleware...
app.get("/test", protect, (req, res) => {
  res.json({ user: req.user });
});


module.exports = app;