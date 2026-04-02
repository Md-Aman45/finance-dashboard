const Transaction = require('../models/transaction.model');


/**
 * Creates a new transaction
 * @param {Object} data - The transaction data
 * @description This function creates a new transaction in the database. It takes the transaction data and the user ID of the creator, and saves the transaction with a reference to the creator. The transaction is marked as not deleted by default.
 * @access Private
*/
const createTransaction = async (data, userId) => {
    const transaction = await Transaction.create({
        ...data,
        createdBy: userId,
    });

    return transaction;
};




/**
 * Retrieves a list of transactions based on the provided query parameters
 * @param {Object} query - The query parameters
 * @returns {Promise<Array>} - A promise resolving to the list of transactions
 * @description This function retrieves transactions from the database based on the provided query parameters. It supports pagination through the `page` and `limit` parameters, and allows filtering by `type` and `category`. The function returns a list of transactions that match the specified criteria, sorted by creation date in descending order.
 * @access Private
*/
const getTransactions = async (query, user) => {
    const { page = 1, limit = 10, type, category } = query;

    const filter = { isDeleted: false };

    if (user && user.role == "viewer") {
        filter.createdBy = user.id;
    }

    if (type) filter.type = type;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

    return transactions;
};





/**
 * Retrieves a transaction by its ID
 * @param {string} id - The transaction ID
 * @description Soft delete don’t remove data, just mark it as deleted 
 * @access Private
*/
const getTransactionById = async (id) => {
    return await Transaction.findOne({ _id: id, isDeleted: false });
};




/**
 * Updates a transaction by its ID
 * @param {string} id - The transaction ID
 * @param {Object} data - The updated transaction data
 * @description This function updates a single transaction in the database based on its ID. It only updates transactions that are not marked as deleted.
 * @access Private
 */
const updateTransaction = async (id, data) => {
    return await Transaction.findByIdAndUpdate(id, data, { new: true });
};




/**
 * Soft Deletes a transaction by its ID
 * @param {string} id - The transaction ID
 * @description This function marks a single transaction as deleted in the database based on its ID. It only updates transactions that are not already marked as deleted.
 * @access Private
*/
const deleteTransaction = async (id) => {
    return await Transaction.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
};



module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
}