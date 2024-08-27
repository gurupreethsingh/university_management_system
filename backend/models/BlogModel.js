const mongoose = require("mongoose");
const slugGenerator = require("mongoose-slug-generator");

mongoose.plugin(slugGenerator);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    summary: {
      type: String,
    },
    tags: [String],
    category: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
    },
    comments: [
      {
        text: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    featuredImage: {
      type: String,
    },
    seoTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title", // Field 'title' will be used to generate slug
      unique: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
