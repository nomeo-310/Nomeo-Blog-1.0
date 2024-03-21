import React from 'react'
import { trendingBlogProps } from './HomeClient';
import AnimationWrapper from '../common/AnimationWrapper'
import TrendingBlogCard from './TrendingBlogCard';

interface Props {
  trendingBlogs: trendingBlogProps[]
}

const TrendingBlogs = ({trendingBlogs}: Props) => {
  return (
    <React.Fragment>
      {trendingBlogs.map((blog:trendingBlogProps, index: number) => (
        <AnimationWrapper key={`blog-${index}`} transition={{duration: 1, delay: index*0.1}}>
          <TrendingBlogCard trendingBlog={blog} index={index}/>
        </AnimationWrapper>
        ))}
    </React.Fragment>
  )
}

export default TrendingBlogs;
