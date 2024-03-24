'use client'

import React from 'react'
import { blogsProps } from './HomeClient'

interface props {
  currentData: blogsProps | null
  getMoreBlogs: ({ page }:{page:number}) => void
  getMoreCategories: ({ page }:{page:number}) => void
  pageState: string
}

const LoadMoreData = ({currentData, getMoreBlogs, getMoreCategories, pageState}:props) => {

  if (currentData !== null && currentData.blogCount > currentData.data.length) {
    return (
      <button 
        className='tag bg-black text-white' 
        onClick={pageState === 'home' ? () => getMoreBlogs({page: currentData.page + 1}) : () => getMoreCategories({page: currentData.page + 1})}
      >
        Load more 
      </button>
    )
  }
}

export default LoadMoreData