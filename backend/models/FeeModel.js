const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid", "overdue"],
      default: "unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "debit_card", "online"],
    },
    transactionId: {
      type: String,
      default: "",
    },
    semester: {
      type: String,
    },
    year: {
      type: Number,
    },
    feeType: {
      type: String,
      enum: ["tuition", "hostel", "library", "lab", "other"],
      default: "tuition",
    },
    description: {
      type: String,
    },
    adjustments: [
      {
        amount: Number,
        date: Date,
        reason: String,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

const Fee = mongoose.model("Fee", feeSchema);

module.exports = Fee;
