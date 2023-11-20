const mongoose = require('mongoose');
const Message = require('./Message'); // Import the Message model
const Review = require('./Review'); // Import the Message model

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "This user has not added a description yet"
    },
    rating: {
        type: Number,
        default: 5
    },
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
        enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

module.exports = mongoose.model('User', userSchema);
