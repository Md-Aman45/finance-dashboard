const express = require('express');
const { getAllUsers, getUser, changeUserRole, changeUserStatus } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');


const userRouter = express.Router();


/**
 * Get all users or a single user by ID
 * @description This routes is for getting all users or a single user by ID. Only admin can access this route.
 * @access Admin only
*/
userRouter.get('/', protect, authorize("admin"), getAllUsers);
userRouter.get('/:id', protect, authorize("admin"), getUser);


/**
 * Change a user's role or status
 * @description This route is for changing a user's role or status. Only admin can access this route.
 * @access Admin only
*/
userRouter.patch('/:id/role', protect, authorize("admin"), changeUserRole);
userRouter.patch('/:id/status', protect, authorize("admin"), changeUserStatus);



module.exports = userRouter;