const mongoose = require('mongoose');
// const Message = require('./Message'); // Import the Message model
//const Review = require('./Review'); // Import the Message model

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        default: "This user did not add an email."
    },
    description: {
        type: String,
        default: "This user has not added a description yet"
    },
    rating: [{
        type: Number,
        default: []
    }],
    comments: [{
        type: String,
        default: []
    }],
    classes: [{
        type: String,
        default: ["ECS3354"]
    }],
    conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    }],
    availability: [{
        type: String,
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    role : {
        type: Number,
        default: 0
    }

    
});

module.exports = mongoose.model('User', userSchema)