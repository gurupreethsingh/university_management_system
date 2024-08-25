const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  assignedTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  // Other course-related fields...
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
