'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const LoadMoreComments = (props: Props) => {
  const router = useRouter();
  const path = usePathname();

  const handleMoreComment = (page:number) => {
    router.push(`${path}?commentPage=${page}`)
  }
  return (
    <button className='tag bg-black text-white dark:bg-grey dark:text-black my-5' onClick={() => handleMoreComment(2)}>
     load more
    </button>
  )
}

export default LoadMoreComments