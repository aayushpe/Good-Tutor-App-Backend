const Message = require('../models/Message');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation'); // Import your Conversation model

const startConversation = asyncHandler(async (req, res) => {
    const { senderId, recipientId } = req.body;

    // Logic to create a new conversation
    const newConversation = new Conversation({
        participants: [senderId, recipientId],
        messages: [] // Assuming your conversation model has a messages array
    });

    await newConversation.save();

    res.status(201).json({ message: 'Conversation started', data: newConversation });
});

module.exports = {
    // ... other methods,
    startConversation
};

// Function to send a message
const sendMessage = asyncHandler(async (req, res) => {
    const { senderId, recipientId, content } = req.body;

    const message = await Message.create({ sender: senderId, recipient: recipientId, content });
    await User.updateOne({ _id: senderId }, { $push: { conversations: message._id } });
    await User.updateOne({ _id: recipientId }, { $push: { conversations: message._id } });

    res.status(201).json({ message: 'Message sent successfully', data: message });
});

// Function to get user conversations
const getUserConversations = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('conversations');

    res.status(200).json({ message: 'Conversations retrieved successfully', data: user.conversations });
});

module.exports = {
    sendMessage,
    getUserConversations,
    startConversation
};
