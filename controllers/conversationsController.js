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

    // Update users' conversations
    await User.updateOne({ _id: senderId }, { $push: { conversations: newConversation._id } });
    await User.updateOne({ _id: recipientId }, { $push: { conversations: newConversation._id } });

    res.status(201).json({ message: 'Conversation started', data: newConversation });
});


// Function to send a message
const sendMessage = asyncHandler(async (req, res) => {
    const { conversationId, senderId, content } = req.body;

    // Create the message
    const message = await Message.create({
        sender: senderId,
        recipient: conversationId, // Assuming this is a group chat and the recipient is the conversation ID
        content
    });

    // Add the message to the conversation's messages array
    const updatedConversation = await Conversation.findByIdAndUpdate(
        conversationId,
        { $push: { messages: message._id } },
        { new: true }
    );

    if (!updatedConversation) {
        return res.status(404).json({ message: 'Conversation not found' });
    }

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
