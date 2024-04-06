import mongoose from "mongoose";
import { Schema } from "mongoose";

const NotificationSchema = new Schema({
  type: { type: String, enum: ["like", "comment", "reply"], required: true },
  blog: { type: mongoose.Schema.ObjectId, ref: "Blog" },
  notificationFor: { type: mongoose.Schema.ObjectId, ref: "User" },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  comment: { type: Schema.Types.ObjectId,ref: "Comment" },
  reply: { type: Schema.Types.ObjectId,ref: "Comment" },
  repliedOnComment: { type: Schema.Types.ObjectId,ref: "Comment" },
  seen: { type: Boolean, default: false }
}, { timestamps: true });

(mongoose.models as any) = {};

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
