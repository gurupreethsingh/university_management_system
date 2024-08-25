const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  conductedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  // Other exam-related fields...
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
