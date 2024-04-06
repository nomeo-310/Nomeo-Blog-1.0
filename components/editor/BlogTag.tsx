import React from 'react'
import { BsXLg } from "react-icons/bs";
import { blogProps } from './EditorClient';

interface blogTagProps {
  tag: string
  blogData: blogProps
  tagIndex: number
  setBlogData: React.Dispatch<React.SetStateAction<blogProps>>;
}

const BlogTag = ({tag, blogData, setBlogData, tagIndex}: blogTagProps) => {
  let renderedTags = blogData.tags

  const deleteTags = () => {
    renderedTags = renderedTags.filter((t:string) => t !== tag);
    setBlogData({...blogData, tags: renderedTags})
  }

  return (
    <div className='relative p-2 mt-2 mr-2 px-5 rounded-full inline-block hover:bg-opacity-50 pr-12 bg-white dark:text-black'>
      <p className='outline-none'>{tag}</p>
      <button className='rounded-full absolute right-3 top-1/2 -translate-y-1/2 ' onClick={deleteTags}>
        <BsXLg className='text-sm pointer-events-none '/>
      </button>
    </div>
  )
}

export default BlogTag