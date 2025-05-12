import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    },
    userPhoto: {
      type: String 
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

export default model("Comment", commentSchema);