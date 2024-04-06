import React from "react";
import { notification } from "./NotificationClient";
import ImageAvatar from "../common/ImageAvatar";
import Link from "next/link";
import { dateGenerator } from "@/hooks/dateGenerator";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { createComment } from "@/libs/actions/comment.action";

type notificationCardProps = {
  notification: notification;
};

const NotificationCard = ({ notification }: notificationCardProps) => {
  const { user: { _id, image, name, username }, createdAt, type, repliedOnComment, comment, blog } = notification;

  const [showCommentField, setShowCommentField] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [commenting, setCommenting] = React.useState(false);
  const path = usePathname();

  const onChangeField = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target;
    setCommentText(input.value);
  }

  const handleSubmission = async () => {
    const commentData = { parentId: comment?._id, blogId: blog?._id, blogAuthor: blog?.author, comment: commentText, type: 'reply', path: path, isReply: true }

    if (commentText.length < 1 || commentText === '') {
      toast.error('You need to make a comment, field cannot be empty!')
    } else {
      
      try {
        setCommenting(true)
        const createdComment = await createComment(commentData as any)
        if (createdComment?.success) {
          setCommentText('');
          setShowCommentField(false);
        }
      } catch (error) {
        console.log(error);
      }
      setCommenting(false)
    }
  }


  return (
    <div className="p-5 border-b border-grey border-l-black">
      <div className="flex gap-5 mb-3">
        <ImageAvatar size="small" image={image} />
        <div className="w-full">
          <h1 className="font-medium text-xl text-dark-grey dark:text-grey">
            <span className="lg:inline-block hidden capitalize">{name}</span>
            <Link href={`/users/${_id}`} className="mx-1 text-black underline dark:text-white">{username}</Link>
            <span className="font-normal">
              {type === "like" ? "liked your blog" : type === "comment" ? "commented on your blog" : "replied on"}
            </span>
          </h1>
          {type === 'reply' ? 
            <div className="p-4 rounded-md bg-grey mt-4 dark:text-black">
              <p>{repliedOnComment?.comment}</p>
            </div>: 
            <Link href={`/blogs/${blog._id}`} className="font-medium dark:text-grey">
              {`"${blog.title}"`}
            </Link>
          }
        </div>
      </div>
      {type !== 'like'  && <p className="ml-14 pl-5 text-xl my-5 dark:text-grey">{ comment?.comment }</p> }
      <div className="ml-14 pl-5 mt-3 text-dark-grey flex gap-8 ">
        <p>{dateGenerator(createdAt)}</p>
        { type === 'comment' && 
          <>
            <button className="underline hover:text-black dark:hover:text-white" onClick={() => setShowCommentField(!showCommentField)}>Reply</button>
            <button className="underline hover:text-black dark:hover:text-white">Delete</button>
          </> 
        }
      </div>
      { showCommentField &&
        <div className="ml-14 pl-5 mt-3">
          <textarea className='input-box pl-5 placeholder:text-dark-grey resize-none rounded overflow-auto outline-none focus:outline-none h-[80px]' placeholder='Give a response...' onChange={onChangeField}/>
          <button className='bg-black text-white px-4 py-2 rounded-full capitalize text-lg mt-3 disabled:bg-black/40' onClick={handleSubmission}>{commenting ? '...replying' : 'reply'}</button>
        </div> 
      }
    </div>
  );
};

export default NotificationCard;
