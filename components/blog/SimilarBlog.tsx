import React from 'react'
import { plainBlog } from './BlogClient'
import AnimationWrapper from '../common/AnimationWrapper'
import LatestBlogCard from '../home/LatestBlogCard'

type similarBlogsProps = {
  similarBlog: plainBlog[] | null
  userId: string
}

const SimilarBlog = ({similarBlog, userId }: similarBlogsProps) => {
  return (
    <React.Fragment>
      {similarBlog !== null && similarBlog.length ?
      <React.Fragment>
        <h1 className='text-2xl mt-12 mb-10'>Similar Blogs</h1>
        {similarBlog.map((blog:plainBlog, index:number) => (
          <AnimationWrapper key={index} transition={{duration: 1, delay: index*0.08}}>
            <LatestBlogCard {...blog} likedPost={blog.likes.includes(userId)}/>
          </AnimationWrapper>))
        }
      </React.Fragment> : ''
      }
    </React.Fragment>
  )
}

export default SimilarBlog;