'use client'

import React from 'react'
import { plainBlog } from './BlogClient'
import { OutputBlockData } from '@editorjs/editorjs'
import Content from './Content'

interface blogContentProps {
  blog: plainBlog | null
}

const BlogContent = ({blog}: blogContentProps) => {
  
  return (
    <div className='my-12 blog-page-content'>
      {blog && blog.content.blocks.map((block:OutputBlockData, index:number) => (
        <div className="my-4 md:my-8" key={index}>
          <Content block={block} />
        </div>
        ) )}
    </div>
  )
}

export default BlogContent
