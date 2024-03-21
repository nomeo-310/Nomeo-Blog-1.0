'use client'

import React from 'react'
import { trendingBlogProps } from './HomeClient'
import Link from 'next/link'

export interface trendingBlogCardProps {
  trendingBlog: trendingBlogProps
  index: number
}

const TrendingBlogCard = ({trendingBlog, index}:trendingBlogCardProps) => {
  const {_id, title, createdAt, author} = trendingBlog;
  return (
    <Link href={`/blog/${_id}`} className='flex gap-5 mb-4'>
      {index + 1}
    </Link>
  )
}

export default TrendingBlogCard