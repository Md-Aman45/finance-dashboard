const Transaction = require('../models/transaction.model');



/**
 * Get total income, expense and balance
 * @description Dashboard shows total income, total expense and balance.
 * @access Admin & Analyst only
*/
const getSummary = async (user) => {

    const match = { isDeleted: false };

    const result = await Transaction.aggregate([
        { $match: match },

        {
            $group: {
                _id: "$type",
                total: { $sum: "$amount" },
            },
        },
    ]);

    let income = 0;
    let expense = 0;

    result.forEach((item) => {
        if (item._id === "income") income = item.total;
        if (item._id === "expense") expense = item.total;
    });

    
    return {
        income,
        expense,
        balance: income - expense,
    };
};




/**
 * Get total amount by category
 * @description Dashboard shows total amount spent in each category.
 * @access Admin & Analyst only
*/
const getCategorySummary = async (user) => {

    const match = { isDeleted: false };

    return await Transaction.aggregate([
        { $match: match },

        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" },
            },
        },
    ]);
};





/**
 * Get trends data
 * @description Dashboard shows monthly trends of income and expenses.
 * @access Admin & Analyst only
*/
const getTrends = async (user) => {

    const match = { isDeleted: false };

    return await Transaction.aggregate([
        { $match: match },

        {
            $group: {
                _id: {
                    month: { $month: "$date" },
                    year: { $year: "$date" },
                },
                total: { $sum: "$amount" },
            },
        },

        { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
};




module.exports = {
    getSummary,
    getCategorySummary,
    getTrends,
};