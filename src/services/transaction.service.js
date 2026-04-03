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
    const { page = 1, limit = 10, type, category, startDate, endDate } = query;

    const filter = { isDeleted: false };

    if (user && user.role == "viewer") {
        filter.createdBy = user.id;
    }

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
        filter.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    };

    const transactions = await Transaction.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

    return transactions;
};





/**
 * Retrieves a transaction by its ID
 * @description This function retrieves a single transaction from the database based on its ID. It checks if the transaction exists and is not marked as deleted. If the user has a "viewer" role, it also ensures that the transaction was created by the user. If the transaction is found, it is returned; otherwise, an error is thrown indicating that the transaction was not found.
 * @access Private
*/
const getTransactionById = async (id, user) => {
    let filter = {
        _id: id,
        isDeleted: false,
    };

    if (user.role === "viewer") {
        filter.createdBy = user.id;
    }

    const transaction = await Transaction.findOne(filter);

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    return transaction;
};




/**
 * Updates a transaction by its ID
 * @param {string} id - The transaction ID
 * @param {Object} data - The updated transaction data
 * @description This function updates a single transaction in the database based on its ID. It only updates transactions that are not marked as deleted.
 * @access Private
 */
const updateTransaction = async (id, data) => {
    const transaction = await Transaction.findOneAndUpdate(
        { _id: id, isDeleted: false },
        data,
        { new: true }
    );

    if (!transaction) {
        throw new Error("Transaction not found or deleted");
    }

    return transaction;
};




/**
 * Soft Deletes a transaction by its ID
 * @param {string} id - The transaction ID
 * @description This function performs a soft delete on a transaction by its ID. Instead of removing the transaction from the database, it sets the `isDeleted` flag to `true`. This allows for the transaction to be retained in the database while being marked as deleted, preventing it from being returned in future queries that filter for non-deleted transactions.
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