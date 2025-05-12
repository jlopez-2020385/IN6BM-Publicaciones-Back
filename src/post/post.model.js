import { Schema, model } from "mongoose";

const postSchema = Schema({
    title:{
        type: String,
        required: true, 
        maxLength: 25,
    },
    description:{
        type: String,
        required: true, 
        maxLength: 500,
    },
    course:{
        type: String,
        required: true, 
        maxLength: 25,
    },
    profilePicture:{
        type: String
    },
    authorName: {
        type: String,
        required: true, 
        maxLength: 25,
    },
    authorPhoto: {
      type: String, 
    },
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment' 
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

export default model("Post", postSchema);