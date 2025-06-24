import User from '../models/user.model.js';
import Messages from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';


export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password'); // Find all users except the logged-in user, excluding password and version fields

        return res.status(200).json(filteredUsers); // Send the filtered users as a response
    } catch (error) {
        console.error('Error fetching users for sidebar controller :', error.message); // Log the error for debugging
        return res.status(500).json({ message: 'Internal server error' }); // Send a 500 status code with an error message
    }
}

export const getMessages = async (req, res) => {
    const { id: userToChatId } = req.params; // Extract the user ID from the request parameters
    const myId = req.user._id; // Get the logged-in user's ID from the request
    try {
        const messages = await Messages.find({
            $or: [
                { senderId: myId, receiverId: userToChatId }, // Messages sent by the logged-in user to the specified user
                { senderId: userToChatId, receiverId: myId } // Messages sent by the specified user to the logged-in user
            ]
        });

        return res.status(200).json(messages); // Send the messages as a response
    } catch (error) {
        console.error('Error getMessages controller :', error.message); // Log the error for debugging
        return res.status(500).json({ message: 'Internal server error' }); // Send a 500 status code with an error message
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body; // Extract the message/image content from the request body
        const { id: receiverId } = req.params; // Extract the receiver ID from the request parameters
        const senderId = req.user._id; // Get the logged-in user's ID from the request

        let imageUrl = null; // Initialize imageUrl to null
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(imageUrl); // Upload the image to Cloudinary
            imageUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
        }

        const newMessage = await Messages({
            senderId,
            receiverId,
            text, // Use the text from the request body
            image: imageUrl, // Use the uploaded image URL
        }); // Create a new message document in the database

        if (!newMessage) {
            return res.status(400).json({ message: 'Failed to create message' }); // If message creation fails, send a 400 status code
        }
        await newMessage.save(); // Save the new message to the database
        return res.status(200).json(newMessage); // Send the newly created message as a

    } catch (error) {
        console.error('Error sending message controller :', error.message); // Log the error for debugging
        return res.status(500).json({ message: 'Internal server error' }); // Send a 500 status code with an error message
    }

}