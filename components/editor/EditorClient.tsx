'use client'


import React from 'react'
import EditorForm from './EditorForm';
import PublishForm from './PublishForm';
import { OutputData } from '@editorjs/editorjs';

type editorClientProps = {
  id?: string
}

export interface blogProps {
  title:string
  banner: { public_id: string, secure_url: string }
  tags: string[]
  description: string
  content: OutputData
  draft: boolean
}

const EditorClient = ({id}:editorClientProps) => {

  const [displayPage, setDisplayPage] = React.useState('editor');

  const initialBlogData = {
    title: '',
    banner: { public_id: '', secure_url: '' },
    description: '',
    tags: [],
    content: { time: 0, version: '', blocks: [] },
    draft: false
  }
  const [blogData, setBlogData] = React.useState<blogProps>(initialBlogData);

  return (
    <div>
      { displayPage === 'editor' ? 
        <EditorForm blogData={blogData} setBlogData={setBlogData} setDisplayPage={setDisplayPage} /> : 
        <PublishForm blogData={blogData} setDisplayPage={setDisplayPage} setBlogData={setBlogData} /> 
      }
    </div>
  )
}

export default EditorClient
