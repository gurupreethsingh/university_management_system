const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Reference to the Admin model
      required: true,
    },
    reportType: {
      type: String,
      required: true,
      enum: ["Academic", "Financial", "Administrative", "Event", "Other"],
      default: "Other",
    },
    fileUrl: {
      type: String,
      required: true, // Assuming reports are stored as files, you might store a URL to the storage location
    },
    accessLevel: {
      type: String,
      required: true,
      enum: ["Public", "Private", "Restricted"],
      default: "Private",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["Draft", "Reviewed", "Approved", "Rejected"],
      default: "Draft",
    },
    publishedDate: {
      type: Date,
    },
    relatedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event", // Linking reports to related events if necessary
      },
    ],
    comments: [
      {
        text: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Admin", // Reference to the Admin model
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    reviewHistory: [
      {
        reviewedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Admin", // Reference to the Admin model
        },
        reviewDate: {
          type: Date,
          default: Date.now,
        },
        notes: String,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps automatically
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
