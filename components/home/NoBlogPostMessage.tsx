import React from 'react'

const NoBlogPostMessage = ({message}:{message:string}) => {
  return (
    <div className='w-full p-4 text-center rounded-full bg-grey/50 mt-4'>
      <p>{message}</p>
    </div>
  )
}

export default NoBlogPostMessage;