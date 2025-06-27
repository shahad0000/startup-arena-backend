import { Schema, model } from "mongoose";

const commentSchema = new Schema( 
  {
    ideaId: { type: Schema.Types.ObjectId, required: true, ref: "Idea" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentCollection = model("Comment", commentSchema);
