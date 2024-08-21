// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/university_management")
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Import the ContactMessage model
const ContactMessage = require('./models/ContactModel');

// Route to add a contact message
app.post('/add-contact-message', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message_text, agreeToLicense } = req.body;

        if (!email || !firstName || !lastName || !message_text) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newContactMessage = new ContactMessage({
            firstName,
            lastName,
            email,
            phone,
            message_text,
            agreeToLicense,
        });

        await newContactMessage.save();
        res.status(201).json({ message: 'Contact message successfully submitted!' });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ error: 'An error occurred while submitting the contact message.' });
    }
});

// Route to get all contact messages (for admin)
app.get('/all-messages', async (req, res) => {
    try {
        const messages = await ContactMessage.find();

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving contact messages:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the contact messages.' });
    }
});

// route to show the question on the screen 
// Route to get a single message
app.get('/reply-message/:id', async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);
        if (!message) return res.status(404).json({ error: 'Message not found' });
        res.status(200).json(message);
    } catch (error) {
        console.error('Error retrieving message:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the message.' });
    }
});

// Route to add a reply to a message
app.post('/give-message-reply/:id/reply', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newReply = {
            name,
            email,
            message,
            timestamp: new Date(),
        };

        const messageDoc = await ContactMessage.findById(req.params.id);
        if (!messageDoc) return res.status(404).json({ error: 'Message not found' });

        messageDoc.replies.push(newReply);
        await messageDoc.save();

        res.status(200).json({ message: 'Reply added successfully!' });
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ error: 'An error occurred while adding the reply.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
