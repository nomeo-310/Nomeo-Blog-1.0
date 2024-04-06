'use client'

import React from 'react'
import { plainBlog } from './BlogClient'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createComment } from '@/libs/actions/comment.action'

type Props = {
  blog: plainBlog | null
  action: 'comment' | 'reply'
  setShowCommentSection: React.Dispatch<React.SetStateAction<boolean>>
  loggedIn: boolean
  parentId?: string
}

const CommentField = ({blog, action, loggedIn, parentId }: Props) => {
  const path = usePathname();
  const route = useRouter()
  const [comment, setComment] = React.useState('');
  const [commenting, setCommenting] = React.useState(false)

  const onChangeField = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target;
    route.refresh();
    setComment(input.value);
  }

  const handleSubmission = async () => {
    let commentData;

    if (action === 'comment') {
      commentData = {blogId: blog?._id, blogAuthor: blog?.author, comment:comment, type: 'comment', path: path }
    } else {
      commentData = { parentId: parentId, blogId: blog?._id, blogAuthor: blog?.author, comment:comment, type: 'reply', path: path, isReply: true }
    }
    try {

      if (comment.length < 1 || comment === '') {
        toast.error('You need to make a comment, field cannot be empty!')
      } else {
        
        if (!loggedIn) {
          route.push(`/sign-in?next=${path}`)
        }

        setCommenting(true);
        const createdComment = await createComment(commentData as any)
        if (createdComment?.success) {
          route.refresh();
          setComment('')
          setCommenting(false)
        }
      }

    } catch (error) {
      console.log(error)
      setCommenting(false)
    }
  }

  return (
    <React.Fragment>
      <textarea className={'input-box pl-5 placeholder:text-dark-grey resize-none rounded overflow-auto outline-none focus:outline-none ' + (action === 'comment' ? 'h-[100px]' : 'h-[80px]')} value={comment} placeholder={action ==='comment' ? 'Leave a comment...' : 'Give a response...'} onChange={onChangeField}/>
      <button className='bg-black text-white px-4 py-2 rounded-full capitalize text-lg mt-3 disabled:bg-black/40' onClick={handleSubmission}>{commenting ? '...sending' : action}</button>
    </React.Fragment> 
  )
}

export default CommentField