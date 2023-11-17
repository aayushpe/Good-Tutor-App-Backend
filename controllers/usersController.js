const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllusers = asyncHandler (async(req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({ message: 'No users found'})
    }
    res.json(users)
})


const createNewUser = asyncHandler (async(req, res) => {
    const { username, password, description, rating} = req.body

    if(!username || !password){
        return res.status(400).json({ message: 'All fields are required!'})
    }
    
    // Check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate) {
        return res.status(409).json ({ message: 'Duplicate username'})
    }

    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = {username, "password" : hashedPwd, description, rating}

    //Create and store the new user
    const user = await User.create(userObject)

    if(user) {
        res.status(201).json({ message: `New user ${username} created`})
    } else {
        res.status(400).json({ message: 'Invalid user data recieved'})
    }
})


const updateUser = asyncHandler (async(req, res) => {
    const { id, username, password, description, rating } = req.body

    // Confirm data 
    if (!id || !username) {
        return res.status(400).json({ message: 'All fields except password, decription, and rating are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.description = description
    user.rating = rating;

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})


const deleteUser = asyncHandler (async(req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    await user.deleteOne()

    const reply = `Username ${user.username} with ID ${user._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllusers,
    createNewUser,
    updateUser,
    deleteUser
}