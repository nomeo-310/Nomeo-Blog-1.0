'use client'

import { OutputData } from '@editorjs/editorjs'
import React from 'react'
import AnimationWrapper from '../common/AnimationWrapper'
import Blog from './Blog'
import CommentSection, { commentData } from './CommentSection'

type commentListProps = {
  commentCount: number
  data: commentData[]
  page: number
}

type blogClientProps = {
  blogId: string
  currentUser: any
  loggedIn: boolean | null | undefined
  blog: plainBlog
  similarBlogs: plainBlog[]
  comments: any
}

export type plainBlogAuthor = {
  _id: string
  name: string
  username: string
  profileImage: {public_id: string, secure_url: string}
  image: string
}

export type plainBlog = {
  _id: string
  author: plainBlogAuthor
  content: OutputData
  description: string
  banner: {public_id: string, secure_url: string}
  tags: string[]
  title: string
  totalLikes: number
  totalReads: number
  totalComments: number
  createdAt: any
  likes: string[]
}

const BlogClient = ({ blogId, currentUser, loggedIn, blog, similarBlogs, comments }: blogClientProps) => {
  const [showCommentSection, setShowCommentSection] = React.useState(false);

  const toggleCommentSection = React.useCallback(() => {
    setShowCommentSection((prevState) => !prevState)
  }, [])

  return (
    <AnimationWrapper>
      <CommentSection showCommentSection={showCommentSection} setShowCommentSection={setShowCommentSection} blog={blog} loggedIn={loggedIn!} comments={comments} currentUser={currentUser}/> 
      <Blog blog={blog} similarBlog={similarBlogs} currentUser={currentUser} loggedIn={loggedIn} toggleCommentSection={toggleCommentSection}/>
    </AnimationWrapper>
  )
}

export default BlogClient