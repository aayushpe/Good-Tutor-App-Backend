const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Use the model name as a string
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Use the model name as a string
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);
