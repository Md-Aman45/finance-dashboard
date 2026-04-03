const { getUsers, getUserById, updateUserRole, updateUserStatus } = require('../services/user.service');


/**
 * Gets all users
 * @description This function retrieves all users from the database and sends them in the response.
 * @access Admin only
*/
const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();

        res.json({
            success: true,
            message: "Get all users successfully",
            data: users,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};




/** 
 * Gets a user by ID
 * @description This function retrieves a user from the database by their ID and sends it in the response.
 * @access Admin only
*/
const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);

        res.json({
            success: true,
            message: "Get User by Id successfully",
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};





/**
 * Changes a user's role
 * @description This function updates a user's role in the database and sends the updated user in the response.
 * @access Admin only
*/
const changeUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        const user = await updateUserRole(req.params.id, role);

        res.json({
            success: true,
            message: "Change User Role successfully",
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}




/**
 * Changes a user's status
 * @description This function updates a user's status in the database and sends the updated user in the response.
 * @access Admin only
*/
const changeUserStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const user = await updateUserStatus(req.params.id, status);

        res.json({
            success: true,
            message: "Update user status successfully",
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}



module.exports = { getAllUsers, getUser, changeUserRole, changeUserStatus };