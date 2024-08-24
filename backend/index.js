// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Admin = require("./models/AdminModel"); // Your admin model
const nodemailer = require("nodemailer");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow this origin
    credentials: true, // Allow credentials (cookies, HTTP authentication)
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Database connection
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/university_management"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import the ContactMessage model
const ContactMessage = require("./models/ContactModel");

// Route to add a contact message
app.post("/add-contact-message", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message_text, agreeToLicense } =
      req.body;

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
    res
      .status(201)
      .json({ message: "Contact message successfully submitted!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({
      error: "An error occurred while submitting the contact message.",
    });
  }
});

// Route to get all contact messages (for admin)
app.get("/all-messages", async (req, res) => {
  try {
    const messages = await ContactMessage.find();

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving contact messages:", error);
    res.status(500).json({
      error: "An error occurred while retrieving the contact messages.",
    });
  }
});

// Route to get a single message
app.get("/reply-message/:id", async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.status(200).json(message);
  } catch (error) {
    console.error("Error retrieving message:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the message." });
  }
});

// Route to add a reply to a message
app.post("/give-message-reply/:id/reply", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newReply = {
      name,
      email,
      message,
      timestamp: new Date(),
    };

    const messageDoc = await ContactMessage.findById(req.params.id);
    if (!messageDoc)
      return res.status(404).json({ error: "Message not found" });

    messageDoc.replies.push(newReply);
    await messageDoc.save();

    res.status(200).json({ message: "Reply added successfully!" });
  } catch (error) {
    console.error("Error adding reply:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the reply." });
  }
});

// Role-based image storage folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const roleFolder = `uploads/${req.body.role}s`;
    const fullPath = path.join(__dirname, roleFolder);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Admin routes
// Register route
app.post("/admin-register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // Create a new admin
    admin = new Admin({
      name,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    // Save the admin to the database
    await admin.save();

    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Login route
app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Generate a JWT token
    const payload = {
      admin: {
        id: admin._id,
        role: admin.role,
        name: admin.name,
      },
    };

    const token = jwt.sign(payload, "ecoders_jwt_secret", { expiresIn: "1h" });

    // Set the JWT token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    return res.json({ status: true, message: "Login Successful." });
  } catch (err) {
    console.error("Error in login:", err);
    return res
      .status(500)
      .json({ msg: "Server error. Please try again later." });
  }
});

const PORT = 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
