const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllusers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

// Add login route
router.post('/login', usersController.loginUser)

router.get('/getone', usersController.getOneuser)

router.patch('/updaterating', usersController.updateRating)

router.patch('/updaterating', usersController.updateRating)

module.exports = router
