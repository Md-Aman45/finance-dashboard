const mongoose = require('mongoose');


/**
 * User Schema
 * @typedef {Object} User
 * @property {string} name - The user's name
 * @property {string} email - The user's email address
 * @property {string} password - The user's hashed password
 * @property {Date} createdAt - The date the user was created
 * @description user model schema definition for MongoDB using Mongoose
*/

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [ true, 'Name is required' ],
        },

        email: {
            type: String,
            required: [ true, 'Email is required' ],
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: [ "viewer", "analyst", "admin" ],
            default: "viewer",
        },

        status: {
            type: String,
            enum: [ "active", "inactive" ],
            default: "active",
        },

    }, { timestamps: true },
);


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;