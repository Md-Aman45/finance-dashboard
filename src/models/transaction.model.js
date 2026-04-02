const mongoose = require('mongoose');

/**
 * Transaction Schema
 * @typedef {Object} Transaction
 * @property {number} amount - The amount of the transaction
 * @description transaction model schema definition for MongoDB using Mongoose
*/
const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [ true, "Amount is required" ]
        },

        type: {
            type: String,
            enum: [ "income", "expense" ],
            required: [ true, "Transaction type is required" ],
        },

        category: {
            type: String,
            required: [ true, "Category is required" ],
        },

        date: {
            type: Date,
            default: Date.now,
        },

        notes: {
            type: String,
            maxlength: [ 200, "Notes cannot exceed 200 characters" ]
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);


const transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;