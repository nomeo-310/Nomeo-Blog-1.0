'use client'

import React from 'react'
import { blogsProps } from '../home/HomeClient'

interface props {
  currentData: blogsProps | null
  getMoreBlogs: ({ page }:{page:number}) => void
}

const LoadMoreBlogs = ({currentData, getMoreBlogs}:props) => {

  if (currentData !== null && currentData.blogCount > currentData.data.length) {
    return (
      <button className='tag bg-black text-white dark:bg-grey dark:text-black' 
        onClick={() => getMoreBlogs({page: currentData.page + 1})}>
        Load more 
      </button>
    )
  }
}

export default LoadMoreBlogs