const { success } = require('zod');
const { getSummary, getCategorySummary, getTrends } = require('../services/dashboard.service');



/**
 * Get summary data
 * @description Controller for dashboard summary route. Returns total income, total expense and balance.
 * @access Admin & Analyst only
*/
const summary = async (req, res) => {
    try {
        const data = await getSummary(req.user);
        res.json({
            success: true,
            message: "Summary data retrieved successfully",
            data
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};





/**
 * Get category summary data
 * @description Controller for dashboard category summary route. Returns total amount spent in each category.
 * @access Admin & Analyst only
*/
const category = async (req, res) => {
    try {
        const data = await getCategorySummary(req.user);
        res.json({
            success: true,
            message: "Category summary data retrieved successfully",
            data
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};





/**
 * Get trends data
 * @description Controller for dashboard trends route. Returns monthly trends of income and expenses.
 * @access Admin & Analyst only
*/
const trends = async (req, res) => {
    try {
        const data = await getTrends(req.user);
        res.json({
            success: true,
            message: "Trends data retrieved successfully",
            data
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};





module.exports = { summary, category, trends };