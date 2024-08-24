<<<<<<< HEAD
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "admin",
    enum: ["admin", "teacher", "student", "hr", "blogger"],
  },
  adminAvatar: { type: String }, // Path to the avatar image
  coverImage: { type: String }, // Path to the cover image
  createdDate: { type: Date, default: Date.now },
  assignedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  managedExams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }],
  managedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  managedTeachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  feesModules: [{ type: mongoose.Schema.Types.ObjectId, ref: "FeeModule" }],
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
});

const Admin = mongoose.model("Admin", adminSchema);
=======
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  alternateContact: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "",
  },
  designation: {
    type: String,
    default: "",
  },
  admin_image: {
    type: String,
    default: "",
  },
  admin_cover_image: {
    type: String,
    default: "",
  },

  role : {type : String, default : "admin"},
  
  roles: {
    createTeacher: {
      type: Boolean,
      default: false,
    },
    createStudent: {
      type: Boolean,
      default: false,
    },
    createExam: {
      type: Boolean,
      default: false,
    },
    createTimetable: {
      type: Boolean,
      default: false,
    },
    createSubject: {
      type: Boolean,
      default: false,
    },
    createClass: {
      type: Boolean,
      default: false,
    },
    assignTeachersToClasses: {
      type: Boolean,
      default: false,
    },
    assignStudentsToClasses: {
      type: Boolean,
      default: false,
    },
    takeAttendance: {
      type: Boolean,
      default: false,
    },
    manageFees: {
      type: Boolean,
      default: false,
    },
    manageCourses: {
      type: Boolean,
      default: false,
    },
    manageBlogs: {
      type: Boolean,
      default: false,
    },
    manageReports: {
      type: Boolean,
      default: false,
    },
    manageEvents: {
      type: Boolean,
      default: false,
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving admin
AdminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Admin = mongoose.model('Admin', AdminSchema);
>>>>>>> dc2ace9315d4efe8d2f8004668d9141ff9e736b9

module.exports = Admin;
