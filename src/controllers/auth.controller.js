const { registerUser, loginUser } = require('../services/auth.service');


/**
 * Controller for user registration
 * @description This function handles the user registration process by calling the registerUser service function and sending an appropriate response back to the client.
 * @access Public
*/
const registerUserController = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};



/**
 * Controller for user login
 * @description This function handles the user login process by calling the loginUser service function and sending an appropriate response back to the client.
 * @access Public
 */
const loginUserController = async (req, res) => {
    try {
        const user = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });
        
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};



module.exports = { registerUserController, loginUserController };