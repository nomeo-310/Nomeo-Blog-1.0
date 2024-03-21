'use client'


import React from 'react'
import AnimationWrapper from '../common/AnimationWrapper';
import WithinPageNavigation from '../common/WithinNavigation';
import LatestBlogs from './LatestBlogs';
import TrendingBlogs from './TrendingBlogs';




export interface latestBlogProps {
  _id: string
  description: string 
  title: string
  banner: { public_id: string, secure_url: string }
  tags: string[] 
  likes: string[] 
  reads: string[] 
  createdAt: string
  author: {_id: string, name: string, image: string, profileImage: {public_id: string, secure_url: string}, username: string}
}

export interface trendingBlogProps {
  _id: string
  title: string
  createdAt: string
  author: {_id: string, name: string, image: string, profileImage: {public_id: string, secure_url: string}, username: string}
}

export interface homeClientProps {
  latestBlogs: latestBlogProps[]
  trendingBlogs: trendingBlogProps[]
}



const HomeClient = ({latestBlogs, trendingBlogs}:homeClientProps) => {

  const homeRoutes = ['home', 'trending blogs'];
  const hiddenRoutes = ['trending blogs']

  return (
    <AnimationWrapper>
      <section className='h-cover flex justify-center gap-10'>
        <div className="w-full">
          <WithinPageNavigation routes={homeRoutes} defaultHidden={hiddenRoutes} defaultActiveIndex={0}>
            <LatestBlogs latestBlogs={latestBlogs}/>
            <TrendingBlogs trendingBlogs={trendingBlogs}/>
          </WithinPageNavigation>
        </div>
      </section>
    </AnimationWrapper>
  )
}

export default HomeClient;
