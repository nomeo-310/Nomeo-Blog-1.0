'use client'

import React from 'react'
import AnimationWrapper from '../common/AnimationWrapper'
import { latestBlogProps } from '@/types/types'
import BlogsCard from './BlogsCard'

interface Props {
  latestBlogs: latestBlogProps[]
  currentUserId?: string
}

const AllBlogs = ({latestBlogs, currentUserId}:Props) => {
  
  return (
    <React.Fragment>
      { latestBlogs.length > 0 && latestBlogs.map((blog:latestBlogProps, index: number) => (
        <AnimationWrapper key={`blog-${index}`} transition={{duration: 1, delay: index*0.1}}>
          <BlogsCard {...blog} likedPost={blog.likes.includes(currentUserId!)}/>
        </AnimationWrapper>
        ))
      }
    </React.Fragment>
  )
}

export default AllBlogs;