import mongoose from "mongoose";
import { Schema } from "mongoose";

const CommentSchema = new Schema({
  type: { type: String, enum: ["like", "comment", "reply"], required: true },
  blogId: { type: mongoose.Schema.ObjectId, ref: "Blog" },
  blogAuthor: { type: mongoose.Schema.ObjectId, ref: "User" },
  comment: { type: String, default: "" },
  parent: { type: Schema.Types.ObjectId,ref: "Comment" },
  children: [{ type: Schema.Types.ObjectId,ref: "Comment" }],
  commentAuthor: { type: mongoose.Schema.ObjectId, ref: "User" },
  isReply: { type: Boolean, default: false }
}, { timestamps: true });

(mongoose.models as any) = {};

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;