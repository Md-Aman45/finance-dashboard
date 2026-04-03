const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/**
 * Registers a new user
 * @param {Object} data - User registration data
 * @description This function creates a new user in the database after validating the input data and hashing the password.
 * @returns {Promise<Object>} - The created user object
 * @access Public
*/

const registerUser = async (data) => {
    const { name, email, password, role } = data;

    if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
};



/**
 * Logs in a user
 * @param {Object} data - User login data
 * @returns {Promise<Object>} - The user object and authentication token
 * @description This function authenticates a user by checking their email and password against the database.
 * @access Public
*/

const loginUser = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }


    if (user.status === "inactive") {
        throw new Error("Your account is inactive. Contact admin.");
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { 
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        }, 
        token,
    };
};


module.exports = { registerUser, loginUser };