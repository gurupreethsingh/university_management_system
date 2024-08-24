const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "student",
    enum: ["student"],
  },
  studentAvatar: { type: String }, // Path to the avatar image
  coverImage: { type: String }, // Path to the cover image
  phone: { type: String }, // Student's phone number
  address: { type: String }, // Student's address
  dateOfBirth: { type: Date }, // Student's date of birth
  enrollmentNumber: { type: String, unique: true }, // Unique enrollment number for the student
  department: { type: String }, // Department the student is enrolled in
  course: { type: String }, // Course the student is enrolled in
  yearOfStudy: { type: Number }, // Year of study (e.g., 1st year, 2nd year)
  qualifications: { type: String }, // Previous academic qualifications
  bio: { type: String }, // Short biography of the student
  createdDate: { type: Date, default: Date.now },

  // Relations to Courses, Exams, Teachers, etc.
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Courses the student is enrolled in
  takenExams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exam" }], // Exams taken by the student
  assignedTeachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }], // Teachers assigned to the student (e.g., advisors, mentors)

  // Grades and Performance
  grades: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      grade: { type: String }, // Grade achieved in the course
    },
  ], // Grades achieved by the student
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }], // Reports generated for the student
  feedbackReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }], // Feedback received by the student

  // Events and Activities
  eventsParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Events the student participated in
  clubsAndSocieties: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ClubSociety" },
  ], // Clubs and societies the student is a part of

  // Notifications and Messages
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  ], // Notifications received by the student
  messagesReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], // Messages received by the student
  messagesSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], // Messages sent by the student

  // Attendance and Leave
  attendanceRecords: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" },
  ], // Attendance records for the student
  leaveRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LeaveRequest" },
  ], // Leave requests made by the student

  // Projects and Thesis
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // Projects the student is working on
  thesis: { type: mongoose.Schema.Types.ObjectId, ref: "Thesis" }, // Thesis work by the student

  // Fees and Payments
  feePayments: [{ type: mongoose.Schema.Types.ObjectId, ref: "FeePayment" }], // Fee payment records for the student
  scholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scholarship" }], // Scholarships awarded to the student

  // Blogs and Publications
  blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }], // Blog posts written by the student
  publications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publication" }], // Academic publications by the student
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
