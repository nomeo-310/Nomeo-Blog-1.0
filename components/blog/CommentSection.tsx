'use client'

import React from 'react'
import { plainBlog } from './BlogClient'
import { BsXLg } from "react-icons/bs";
import CommentField from './CommentField';
import NoBlogPostMessage from '../home/NoBlogPostMessage';
import AnimationWrapper from '../common/AnimationWrapper';
import CommentCard from './CommentCard';
import LoadMoreComments from './LoadMoreComments';

type commentSectionProps = {
  showCommentSection:boolean
  setShowCommentSection:React.Dispatch<React.SetStateAction<boolean>>
  blog: plainBlog | null
  loggedIn: boolean
  comments: commentListProps
  currentUser: any
}

type commentAuthor = {
  image: string
  name: string
  username: string
  _id: string
}

export type singleComment = {
  _id: string
  blogAuthor: string
  commentAuthor: commentAuthor
  blogId: string
  type: string
  updatedAt: string
  createdAt: string
  isReply: boolean
  comment: string
}
export type commentData = {
  _id: string
  blogId: string
  blogAuthor: string
  children: singleComment[]
  commentAuthor: commentAuthor
  type: string
  updatedAt: string
  createdAt: string
  isReply: boolean
  comment: string
}

type commentListProps = {
  commentCount: number
  data: commentData[]
  page: number
  currentUser: any
}

const CommentSection = ({showCommentSection, setShowCommentSection, blog, loggedIn, comments, currentUser }: commentSectionProps) => {

  const closeCommentSection = React.useCallback(() => {
    setShowCommentSection(false);
  }, [setShowCommentSection]);
  
  return (
    <div className={'max-sm:w-full fixed ' + (showCommentSection ? 'top-0 sm:right-0' : 'top-[100%] sm:right-[-100%]') + ' duration-700 max-sm:right-0 sm:top-0 lg:w-[40%] w-[30%] lg:min-w-[400px] min-w-[350px] h-full z-50 bg-white dark:bg-[#121212] shadow-2xl p-8 px-10 overflow-y-auto overflow-x-hidden'}>
      <div className="relative">
        <h1 className='text-xl font-medium dark:text-grey'>Comments</h1>
        <p className='text-lg mt-2 w-[80%] text-dark-grey line-clamp-1 dark:text-grey'>{blog?.title}</p>
        <button className='absolute top-0 right-0 w-10 h-10 flex items-center justify-center bg-grey rounded-full' onClick={closeCommentSection}>
          <BsXLg className="text-xl" />
        </button>
      </div>
      <hr className='border border-grey my-8 -ml-10' />
      <CommentField blog={blog}  action='comment' setShowCommentSection={setShowCommentSection} loggedIn={loggedIn} />
      { comments && comments.data.length ? comments.data.map((comment:commentData, index:number) => (
        <AnimationWrapper key={index}>
          <CommentCard data={comment} index={index} blog={blog} loggedIn={loggedIn} setShowCommentSection={setShowCommentSection} currentUser={currentUser}/>
        </AnimationWrapper>)) : <NoBlogPostMessage message='No comments yet'/>
      }
    </div>
  )
}

export default CommentSection;