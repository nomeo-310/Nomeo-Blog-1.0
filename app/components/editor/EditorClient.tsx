'use client'


import React from 'react'
import EditorForm from './EditorForm';
import PublishForm from './PublishForm';

interface Props {
  
}

const EditorClient = (props: Props) => {
  const [displayPage, setDisplayPage] = React.useState('editor');

  return (
    <div>
      { displayPage === 'editor' ? <EditorForm/> : <PublishForm/> }
    </div>
  )
}

export default EditorClient
