const express = require('express')

const userController = require('../controllers/userControllers')

const router = express.Router() //returns a middleware

//middleware - param(parameter, middleware fucn)
router.param('id', userController.checkId)

//apply middleware to certain routes
//reason - help us move these routes into separate files
router.route('/')
    .get(userController.getusers)
    .post(userController.validateBody,userController.postuser)

router.route('/:id')
    .get(userController.getuserbyid)
    .patch(userController.updateuser)
    .delete(userController.deleteuser)

module.exports = router