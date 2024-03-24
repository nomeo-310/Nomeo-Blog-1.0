'use client'

import React from 'react'
import LatestBlogCard from './LatestBlogCard'
import AnimationWrapper from '../common/AnimationWrapper'
import { latestBlogProps } from '@/types/types'

interface Props {
  latestBlogs: latestBlogProps[]
}

const LatestBlogs = ({latestBlogs}:Props) => {
  return (
    <React.Fragment>
      { latestBlogs.length > 0 && latestBlogs.map((blog:latestBlogProps, index: number) => (
        <AnimationWrapper key={`blog-${index}`} transition={{duration: 1, delay: index*0.1}}>
          <LatestBlogCard {...blog}/>
        </AnimationWrapper>
        ))
      }
    </React.Fragment>
  )
}

export default LatestBlogs;