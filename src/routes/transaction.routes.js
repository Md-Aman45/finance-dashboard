const express = require('express');
const { create, getAll, getOne, update, remove } = require('../controllers/transaction.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

const transRouter = express.Router();



/**
 * Create a new transaction
 * @description This route is for creating a new transaction
 * @access Private
*/
transRouter.post('/create', protect, create);


/**
 * Update or delete a transaction by ID
 * @description This route is for updating or deleting a transaction by ID. Only admin can perform these actions.
 * @access Admin
*/
transRouter.put('/update/:id', protect, authorize("admin"), update);
transRouter.delete('/remove/:id', protect, authorize("admin"), remove);



/**
 * Get all transactions or a single transaction by ID
 * @description This is for both admin and user to view transactions.
 * @access Admin and User
*/
transRouter.get('/', protect, getAll);
transRouter.get('/:id', protect, getOne);



module.exports = transRouter;