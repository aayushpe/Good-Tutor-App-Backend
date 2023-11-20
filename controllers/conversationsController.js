const Message = require('../models/Message');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation'); // Import your Conversation model

const startConversation = asyncHandler(async (req, res) => {
    const { senderId, recipientId, recipientUserName } = req.body;

    // Check if a conversation between these two users already exists
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recipientId] }
    });

    if (!conversation) {
        // If not, create a new conversation
        conversation = new Conversation({
            conversationTitle: recipientUserName, // Set the title based on the recipient's username
            participants: [senderId, recipientId],
            messages: [] // Start with an empty messages array
        });
        await conversation.save();

        // Update users' conversations
        await User.updateOne({ _id: senderId }, { $push: { conversations: conversation._id } });
        await User.updateOne({ _id: recipientId }, { $push: { conversations: conversation._id } });
    }

    res.status(201).json({ message: 'Conversation started', data: conversation });
});




const sendMessage = asyncHandler(async (req, res) => {
    const { conversationId, senderId, content } = req.body;

    // Retrieve the conversation to find the other participant (recipient)
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
    }

    // Assuming a two-participant conversation model
    const recipientId = conversation.participants.find(participant => participant.toString() !== senderId);

    // Create the message
    const message = new Message({
        sender: senderId,
        recipient: recipientId,
        content,
        deliveryStatus: true
    });

    await message.save();

    // Add the message to the conversation's messages array
    const updatedConversation = await Conversation.findByIdAndUpdate(
        conversationId,
        { $push: { messages: message._id } },
        { new: true }
    ).populate({
        path: 'messages',
        populate: { path: 'sender recipient' }
    });

    res.status(201).json({ message: 'Message sent successfully', data: updatedConversation });
});




// Function to get user conversations
const getUserConversations = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userConversations = await Conversation.find({
        participants: userId
    }).populate({
        path: 'messages',
        populate: { path: 'sender' } // Further populate the sender of each message
    });

    res.status(200).json({ message: 'Conversations retrieved successfully', data: userConversations });
});


module.exports = {
    sendMessage,
    getUserConversations,
    startConversation
};
