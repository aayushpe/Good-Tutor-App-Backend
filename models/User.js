const mongoose = require('mongoose');
const Message = require('./Message'); // Import the Message model

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
        ref: 'Message'
    }],
    availability: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
});

module.exports = mongoose.model('User', userSchema);
