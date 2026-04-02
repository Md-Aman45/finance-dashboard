const express = require("express");
const { summary, category, trends } = require('../controllers/dashboard.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

const dashRouter = express.Router();



/**
 * Dashboard Routes
 * @description Admin and Analyst can access these routes to get summary, category summary, and trends data for transactions. Viewers do not have access to these routes.
 * @access Admin & Analyst only
 */
dashRouter.get('/summary', protect, authorize("admin", "analyst"), summary);
dashRouter.get('/category', protect, authorize("admin", "analyst"), category);
dashRouter.get('/trends', protect, authorize("admin", "analyst"), trends);



module.exports = dashRouter;