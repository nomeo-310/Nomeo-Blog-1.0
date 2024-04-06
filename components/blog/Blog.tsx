'use client'

import React from 'react'
import { plainBlog } from './BlogClient'
import Image from 'next/image'
import ImageAvatar from '../common/ImageAvatar'
import Link from 'next/link'
import { fullDateGenerator } from '@/hooks/dateGenerator'
import BlogButtons from './BlogButtons'
import SimilarBlog from './SimilarBlog'
import BlogContent from './BlogContent'

type Props = {
  blog: plainBlog | null
  similarBlog: plainBlog[] | null
  currentUser: any
  loggedIn: boolean | null | undefined
  toggleCommentSection: () => void
}

const Blog = ({ blog, similarBlog, currentUser, loggedIn, toggleCommentSection }: Props) => {


  return (
    <div className='max-w-[900px] center py-10 max-lg:px-[5vw] dark:text-white'>
      <div className="relative aspect-video flex items-center justify-center rounded-lg overflow-hidden bg-grey">
        <Image src={blog?.banner.secure_url!} alt='banner'  fill/>
      </div>
      <div className='mt-10'>
        <h2 className=''>{blog?.title}</h2>
        <div className="flex max-sm:flex-col justify-between my-8">
          <div className="flex gap-5 items-start">
            <ImageAvatar image={blog?.author.image} />
            <p className='capitalize dark:text-grey'>{blog?.author.name} <br /> 
            <Link href={`/users/${blog?.author._id}`} className="underline dark:text-grey" >{blog?.author.username}</Link></p>
          </div>
          <p className='text-dark-grey max-sm:mt-6 max-sm:ml-12 max-sm:pl-5 dark:text-grey'>Published on {fullDateGenerator(blog?.createdAt)}</p>
        </div>
      </div>
      <BlogButtons blog={blog} userId={currentUser?._id} loggedIn={loggedIn} toggleCommentSection={toggleCommentSection}/>
      <BlogContent blog={blog}/>
      <SimilarBlog similarBlog={similarBlog} userId={currentUser?._id}/>
    </div>
  )
}

export default Blog;