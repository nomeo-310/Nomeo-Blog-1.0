import mongoose from "mongoose";
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  hashedPassword: { type: String, default: '' },
  username: { type: String, default: '' },
  bio: { type: String, default: '' },
  image: { type: String, default: '' },
  profileImage: { type: Object, default: { public_id: '', secure_url: '' } },
  youtube: { type: String,default: "" },
  instagram: { type: String, default: "" },
  facebook: { type: String, default: ""},
  twitter: { type: String, default: "" },
  github: { type: String, default: "" },
  website: { type: String, default: ""},
  totalBlogs: {type: Number, default: 0},
  totalReads: {type: Number, default: 0},
  totalLikedBlogs: {type: Number, default: 0},
  blogs: [{type: mongoose.Schema.ObjectId, ref: 'Blog'}],
  readBlogs: [{type: mongoose.Schema.ObjectId, ref: 'Blog'}],
  likedBlogs: [{type: mongoose.Schema.ObjectId, ref: 'Blog'}]
}, {timestamps: true});

(mongoose.models as any) = {};

const User = mongoose.model('User', UserSchema);

export default User;