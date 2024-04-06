'use client'

import React from 'react'
import { blogsProps } from './SearchClient'

interface props {
  currentData: blogsProps | null
  getMoreSearchItems: ({ page }:{page:number}) => void
}

const LoadMoreSearchItem = ({currentData, getMoreSearchItems}:props) => {

  if (currentData !== null && currentData.blogCount > currentData.data.length) {
    return (
      <button 
        className='tag bg-black text-white' 
        onClick={() => getMoreSearchItems({page: currentData.page + 1})}
      >
        Load more 
      </button>
    )
  }
}

export default LoadMoreSearchItem