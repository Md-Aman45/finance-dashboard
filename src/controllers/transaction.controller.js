const { 
    createTransaction,
    getTransactions, 
    getTransactionById, 
    updateTransaction, 
    deleteTransaction 
} = require('../services/transaction.service');



/**
 * Create a new transaction
 * @description This controller handles the creation of a new transaction.
 * @access Private
*/
const create = async (req, res) => {
    try {
        const transaction = await createTransaction(req.body, req.user.id);

        res.status(201).json({ 
            success: true,
            message: "Transaction created successfully",
            data: transaction 
        });

    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};





/**
 * Get all transactions
 * @description This controller retrieves all transactions based on query parameters.
 * @access Private
*/
const getAll = async (req, res) => {
    try {
        const transactions = await getTransactions(req.query, req.user);

        res.json({
            success: true,
            message: "Transactions retrieved successfully",
            data: transactions
        });

    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};




/**
 * Get a single transaction by ID
 * @description This controller retrieves a transaction by its ID.
 * @access Private
*/
const getOne = async (req, res) => {
    try {
        const transaction = await getTransactionById(req.params.id, req.user);

        res.json({
            success: true,
            message: "Transaction retrieved successfully",
            data: transaction
        });

    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};




/**
 * Update a transaction
 * @description This controller updates a transaction by its ID.
 * @access Private
*/
const update = async (req, res) => {
    try {
        const transaction = await updateTransaction(req.params.id, req.body);

        res.json({
            success: true,
            message: "Transaction updated successfully",
            data: transaction
        });

    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};




/**
 * Remove a transaction
 * @description This controller removes a transaction by its ID.
 * @access Private
*/
const remove = async (req, res) => {
    try {
        const transaction = await deleteTransaction(req.params.id);

        res.json({
            success: true,
            message: "Transaction soft delete / remove successfully",
            data: transaction
        });

    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};




module.exports = { create, getAll, getOne, update, remove };