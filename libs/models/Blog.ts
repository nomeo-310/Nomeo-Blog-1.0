import mongoose from "mongoose";
import { Schema } from 'mongoose';

const BlogSchema = new Schema({
  blogId: { type: String, default: '' },
  author: {type: mongoose.Schema.ObjectId, ref: 'User'},
  title: { type: String, default: '' },
  banner: { type: Object, default: { public_id: '', secure_url: '' } },
  description: { type: String, default: '' },
  content: { type: Object, default: { time: Number, blocks: [], version: String }},
  tags: [{ type: String, default: '' }],
  totalLikes: {type: Number, default: 0},
  totalReads: {type: Number, default: 0},
  totalComments: {type: Number, default: 0},
  totalParentComments: {type: Number, default: 0},
  likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  reads: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}],
  draft: {type: Boolean, default: false},
}, {timestamps: true});

(mongoose.models as any) = {};

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;