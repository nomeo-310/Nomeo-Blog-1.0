'use client'

import React from 'react'
import ImageAvatar from '../common/ImageAvatar'
import { commentData } from './CommentSection'
import { dateGenerator } from '@/hooks/dateGenerator'
import CommentField from './CommentField'
import { plainBlog } from './BlogClient'
import { BsChatRightText, BsTrash3 } from 'react-icons/bs'
import { usePathname, useRouter } from 'next/navigation'
import { deleteComments } from '@/libs/actions/comment.action'

type commentCardProps = {
  data: commentData
  index: number
  blog: plainBlog | null
  loggedIn: boolean
  setShowCommentSection:React.Dispatch<React.SetStateAction<boolean>>
  currentUser:any
}

const CommentCard = ({data, blog, loggedIn, setShowCommentSection, currentUser}: commentCardProps) => {
  const {name, image, username } = data.commentAuthor;
  const {comment, createdAt, _id, children} = data

  const [isReply, setIsReply] = React.useState(false);
  const [showReplies, setShowReplies] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleClickReply = React.useCallback(() => {
    setIsReply((prevState) => !prevState)
  }, []);

  const handleToggleReply = React.useCallback(() => {
    setShowReplies((prevState) => !prevState)
    setIsReply(false);
  }, []);

  const handleDeleteBlog = React.useCallback(async(id:string) => {
    try {
      await deleteComments({commentId: id, blogId: blog?._id!, path: pathname, userId: currentUser?._id})
      .then((response) => {
        if (response.success) {
          router.refresh();
        }
      });
    } catch (error) {
      console.log(error)
    }
  }, [blog?._id, pathname, router, currentUser?._id]);

  return (
    <div className='w-full'>
      <div className="my-4 p-3 border-b border-grey">
        <div className="flex gap-3 items-center mb-5 dark:text-grey">
          <ImageAvatar image={image} size='small' />
          <p className='line-clamp-1 '>{name} {username}</p>
          <p className='min-w-fit'>{dateGenerator(createdAt)}</p>
        </div>
        <p className='dark:text-grey'>{comment}</p>
        <div className='flex items-center justify-between mt-4'>
          <div className="flex gap-6 items-center">
            { children && children.length > 0 &&
              <button className={'flex gap-2 items-center ' + (showReplies ? 'bg-grey dark:text-black px-4 py-2 rounded-full' : 'hover:bg-grey group hover:text-black px-4 py-2 rounded-full')} onClick={handleToggleReply}>
                <BsChatRightText className={'dark:text-grey group-hover:dark:text-black ' + (showReplies && 'text-black')}/>
                { showReplies ? "" : <p className='dark:text-grey group-hover:dark:text-black'>{children && children.length}</p> }
                { showReplies ? <p className='dark:text-black group-hover:dark:text-black'>{children.length === 1 ? 'Hide reply' : 'Hide replies'}</p> : <p className='dark:text-grey group-hover:dark:text-black'>{children.length === 1 ? 'Reply' : 'Replies'}</p>}
              </button>
            }
            <button className='bg-black text-white px-4 py-2 rounded-full dark:text-grey' onClick={handleClickReply}>Reply</button>
          </div>
          {currentUser?._id === data.commentAuthor?._id && 
            <button className='p-2 rounded-full bg-red/30 hover:bg-red/30 active:bg-red/30 dark:text-white' onClick={() => handleDeleteBlog(_id)}>
              <BsTrash3 />
            </button>
          }
        </div>
        { isReply ? 
          <div className='mt-4'>
            <CommentField action="reply" blog={blog} loggedIn={loggedIn} setShowCommentSection={setShowCommentSection} parentId={_id} />
          </div> : ''
        }
      </div>
      { showReplies &&
        <React.Fragment>
          { children && children.length > 0 && children.map((item:any, index:number) => (
            <div className=" ml-6 p-3 border-b border-grey" key={index}>
              <div className="flex gap-3 items-center mb-4">
                <ImageAvatar image={item.commentAuthor.image} size='small' />
                <p className='line-clamp-1 dark:text-grey'>{item.commentAuthor.name} {item.commentAuthor.username}</p>
                <p className='min-w-fit dark:text-grey'>{dateGenerator(item.createdAt)}</p>
              </div>
              <p className='dark:text-grey'>{item.comment}</p>
              { currentUser._id === item.commentAuthor._id &&
                <div className='mt-1 flex items-center justify-end'>
                  <button className='p-2 rounded-full bg-red/30 hover:bg-red/30 active:bg-red/30 dark:text-white' onClick={() => handleDeleteBlog(item._id)}>
                    <BsTrash3 />
                  </button>
                </div>
              }
            </div>))
          }
        </React.Fragment>
      }
    </div>
  )
}
export default CommentCard