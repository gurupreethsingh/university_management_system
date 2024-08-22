const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
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



// admin register route
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadFolder = "uploads/";

    if (file.fieldname === "admin_image") {
        uploadFolder += "admins";
    } 
    else if (file.fieldname === "admin_cover_image") {
        uploadFolder += "admins";
    } 
    else if (file.fieldname === "teacher_cover_image") {
        uploadFolder += "teachers";
    } 
    else if (file.fieldname === "teacher_image") {
        uploadFolder += "teachers";
    } 
    else if (file.fieldname === "student_image") {
        uploadFolder += "students";
    } 
    else if (file.fieldname === "students_cover_image") {
        uploadFolder += "students";
    } 
    else if (file.fieldname === "blog_image") {
        uploadFolder += "blogs";
    } 
    else if (file.fieldname === "blog_cover_image") {
        uploadFolder += "blogs";
    } 
    else if (file.fieldname === "hr_image") {
        uploadFolder += "hrs";
    } 
    else if (file.fieldname === "hr_cover_image") {
        uploadFolder += "hrs";
    } 
    else if (file.fieldname === "exam_image") {
        uploadFolder += "exams";
    } 
    else if (file.fieldname === "exam_cover_image") {
        uploadFolder += "exams";
    }
    


    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/admin-register", upload.fields([{ name: 'admin_image' }, { name: 'admin_cover_image' }]), async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin user with the required fields and optional images
      const user = new Employee({
        name,
        email,
        password: hashedPassword,
        role: "admin",
        admin_image: req.files['admin_image'] ? `admins/${req.files['admin_image'][0].filename}` : null, // Store relative path for admin_image
        admin_cover_image: req.files['admin_cover_image'] ? `admins/${req.files['admin_cover_image'][0].filename}` : null, // Store relative path for admin_cover_image
      });
  
      // Save the user to the database
      await user.save();
      res.status(201).json({ message: "Admin created successfully!" });
    } catch (error) {
      console.error("Error creating an admin:", error);
      res.status(500).json({ error: "Failed to register admin" });
    }
});

  
  // Route to Login a User (Customer or Employee)
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      let user =
        (await Customer.findOne({ email })) ||
        (await Employee.findOne({ email }));
  
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          userType: user instanceof Customer ? "customer" : "employee",
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        message: "Logged in successfully!",
        token,
        first_name: user.first_name,
        department: user.department,
        position: user.position,
        employee_image: user.employee_image || user.customer_image || null,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Failed to log in user" });
    }
  });
  
  // Middleware to authenticate using JWT
  const authenticate = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
