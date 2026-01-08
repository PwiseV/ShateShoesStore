import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Phối đồ", "Xu hướng", "Review"], 
      default: "Phối đồ",
    },
    status: {
      type: String,
      enum: ["active", "hidden"], 
      default: "active",
    },
    // link into cloudinary
    thumbnail: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
  },
  {
    // automatically manage createdAt and updatedAt fields
    timestamps: true, 
    // _id -> id
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual field to convert _id to id
postSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Post = mongoose.model("Post", postSchema);

export default Post;