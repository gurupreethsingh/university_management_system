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
const Teacher = require("./models/TeacherModel");
const Student = require("./models/StudentModel");
const Event = require("./models/EventModel");
const Course = require("./models/CourseModel");
const auth = require("./middleware/auth");
const ObjectId = mongoose.Types.ObjectId;
const authenticateToken = require("./middleware/authenticateToken");

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
// app.get("/all-messages", async (req, res) => {
//   try {
//     const messages = await ContactMessage.find();

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error("Error retrieving contact messages:", error);
//     res.status(500).json({
//       error: "An error occurred while retrieving the contact messages.",
//     });
//   }
// });

// Route to get all contact messages along with their replies (for admin)
app.get("/all-messages", async (req, res) => {
  try {
    // Using .find() to retrieve all messages along with their replies
    const messages = await ContactMessage.find().lean();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving contact messages and replies:", error);
    res.status(500).json({
      error:
        "An error occurred while retrieving the contact messages and replies.",
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
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      "ecoders_jwt_secret",
      { expiresIn: "1h" }
    );

    // Return the token and admin data
    res.json({
      status: true,
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// teacher routes.

// register teacher.

app.post("/teacher-register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the teacher already exists
    let teacher = await Teacher.findOne({ email });
    if (teacher) {
      return res.status(400).json({ msg: "Teacher already exists" });
    }

    // Create a new teacher
    teacher = new Teacher({
      name,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(password, salt);

    // Save the teacher to the database
    await teacher.save();

    res.status(201).json({ msg: "Teacher registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// teacher login,

// Login route for Teacher
app.post("/teacher-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the teacher exists
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: teacher._id, email: teacher.email, name: teacher.name },
      "ecoders_jwt_secret",
      { expiresIn: "1h" }
    );

    // Return the token and teacher data
    res.json({
      status: true,
      token,
      teacher: { id: teacher._id, name: teacher.name, email: teacher.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// student routes.

app.post("/student-register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: "Student already exists" });
    }

    // Create a new student
    const enrollmentNumber = generateEnrollmentNumber(); // Generate the enrollment number

    student = new Student({
      name,
      email,
      password,
      enrollmentNumber, // Set the generated enrollment number
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);

    // Save the student to the database
    await student.save();

    res.status(201).json({ msg: "Student registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Function to generate an enrollment number (you can implement this according to your logic)
function generateEnrollmentNumber() {
  // For example, generate a random number or use a sequential counter
  return "ENROLL-" + Math.floor(1000 + Math.random() * 9000);
}

// student login code.

// Student Login route
app.post("/student-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, name: student.name },
      "ecoders_jwt_secret",
      { expiresIn: "1h" }
    );

    // Return the token and student data
    res.json({
      status: true,
      token,
      student: { id: student._id, name: student.name, email: student.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// profile page code.

app.get("/profile", auth, async (req, res) => {
  try {
    let user;

    if (req.user.role === "admin") {
      user = await Admin.findById(req.user.id);
    } else if (req.user.role === "teacher") {
      user = await Teacher.findById(req.user.id);
    } else if (req.user.role === "student") {
      user = await Student.findById(req.user.id);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

app.get("/teacher-dashboard/counts", authenticateToken, async (req, res) => {
  try {
    const totalTeachers = await Teacher.countDocuments(); // This gives the total number of teachers

    const assignedCourses = await Course.countDocuments({
      assignedTeacher: req.user._id,
    });
    const conductedExams = await Exam.countDocuments({
      conductedBy: req.user._id,
    });
    const supervisedStudents = await Student.countDocuments({
      supervisedBy: req.user._id,
    });
    const eventsOrganized = await Event.countDocuments({
      organizedBy: req.user._id,
    });

    res.json({
      totalTeachers, // Use this for total teacher count
      assignedCourses,
      conductedExams,
      supervisedStudents,
      eventsOrganized,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ message: "Server error fetching counts" });
  }
});

// function to fetch all the user from the database . to show on the admin dashboard.

// Route to get all users
app.get("/admin-dashboard/users", async (req, res) => {
  try {
    // Fetch all users from different collections
    const admins = await Admin.find({}, "name email role adminAvatar");
    const teachers = await Teacher.find({}, "name email role teacherAvatar");
    const students = await Student.find({}, "name email role studentAvatar");

    // Combine all users into a single array
    const users = [
      ...admins.map((admin) => ({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.adminAvatar,
      })),
      ...teachers.map((teacher) => ({
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
        avatar: teacher.teacherAvatar,
      })),
      ...students.map((student) => ({
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        avatar: student.studentAvatar,
      })),
    ];

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// Route to get counts for the AdminDashboard
app.get("/admin-dashboard/counts", async (req, res) => {
  try {
    const totalUsers =
      (await Admin.countDocuments()) +
      (await Teacher.countDocuments()) +
      (await Student.countDocuments());
    const totalAdmins = await Admin.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalEvents = await Event.countDocuments();

    res.status(200).json({
      totalUsers,
      totalAdmins,
      totalTeachers,
      totalStudents,
      totalEvents,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ message: "Server error fetching counts" });
  }
});

// Route to get counts for the TeacherDashboard
app.get("/teacher-dashboard/counts", async (req, res) => {
  try {
    const totalTeachers = await Teacher.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalExams = await Exam.countDocuments(); // Assuming you have an Exam model

    res.status(200).json({
      totalTeachers,
      totalStudents,
      totalExams,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ message: "Server error fetching counts" });
  }
});

// Route to get all teachers
app.get("/teacher-dashboard/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find({}, "name email role teacherAvatar");

    res.json(
      teachers.map((teacher) => ({
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
        avatar: teacher.teacherAvatar,
      }))
    );
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Server error fetching teachers" });
  }
});

const PORT = 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
