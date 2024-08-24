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

module.exports = Admin;
