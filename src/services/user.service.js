const User = require('../models/user.model');


/**
 * Gets all users
 * @description This function retrieves all users from the database, excluding their passwords.
 * @access Admin only
*/
const getUsers = async () => {
    return await User.find().select("-password");
};




/**
 * Gets a user by ID
 * @description This function retrieves a user from the database by their ID, excluding their password.
 * @access Admin only
*/
const getUserById = async (id) => {
    const user = await User.findById(id).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}




/**
 * Updates a user's role
 * @description This function updates a user's role in the database.
 * @access Admin only
*/
const updateUserRole = async (id, role) => {
    const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
    ).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}




/**
 * Updates a user's status
 * @description This function updates a user's status in the database.
 * @access Admin only
*/
const updateUserStatus = async (id, status) => {
    const user = await User.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    ).select("-password");


    if (!user) {
        throw new Error("User not found");
    }

    return user;
}




module.exports = { getUsers, getUserById, updateUserRole, updateUserStatus };