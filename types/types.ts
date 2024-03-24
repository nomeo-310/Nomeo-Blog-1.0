import { OutputData } from "@editorjs/editorjs"

export interface userProps {
  email:string
  fullname:string
  password:string
}
export interface signUserProps {
  email:string
  password:string
}

export interface userProps {
  _id: string
  name: string,
  email: string,
  hashedPassword?: string,
  username?: string,
  bio?: string,
  image?: string,
  profileImage?: { public_id: string, secure_url: string },
  youtube?: string
  instagram?: string
  facebook?: string
  twitter?: string
  github?: string
  website?: string
  blogs: string[],
  readBlogs: string[],
  likedBlogs: string[]
}

export interface blogProps {
  _id: string
  blogId: string,
  authorId: string,
  title: string,
  banner: { public_id: string, secure_url: string },
  description: string,
  content: OutputData,
  tags: string[],
  likes: string[],
  reads: string[],
  comments: string[],
  draft: boolean,
}

export interface latestBlogProps {
  _id: string;
  description: string;
  title: string;
  banner: { public_id: string; secure_url: string };
  tags: string[];
  likes: string[];
  reads: string[];
  createdAt: string;
  author: {
    _id: string;
    name: string;
    image: string;
    profileImage: { public_id: string; secure_url: string };
    username: string;
  };
}

export interface trendingBlogProps {
  _id: string;
  title: string;
  createdAt: string;
  author: {
    _id: string;
    name: string;
    image: string;
    profileImage: { public_id: string; secure_url: string };
    username: string;
  };
}