'use client'

import React from 'react'
import { latestBlogProps } from './HomeClient'
import LatestBlogCard from './LatestBlogCard'
import AnimationWrapper from '../common/AnimationWrapper'

interface Props {
  latestBlogs: latestBlogProps[]
}

const LatestBlogs = ({latestBlogs}:Props) => {

  return (
    <React.Fragment>
      {latestBlogs.map((blog:latestBlogProps, index: number) => (
        <AnimationWrapper key={`blog-${index}`} transition={{duration: 1, delay: index*0.1}}>
          <LatestBlogCard {...blog}/>
        </AnimationWrapper>
        ))}
    </React.Fragment>
  )
}

export default LatestBlogs;