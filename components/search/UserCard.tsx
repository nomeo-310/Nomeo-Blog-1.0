import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface userCardProps {
  _id: string
  name: string
  username: string
  image: string
  profileImage: { public_id: string, secure_url: string }
}

const UserCard = ({ _id, name, username, image }: userCardProps) => {
  return (
    <Link href={`/users/${_id}`} className='flex gap-5 items-center mb-3 hover:bg-grey p-2 rounded-lg'>
      <div className={`relative w-14 h-14 overflow-hidden flex items-center justify-center rounded-full ${image ? '' : "border border-dark-grey/40"}  `} >
        <Image src={image ? image : '/images/default_user.png'} alt='user_profile' fill />
      </div>
      <div>
        <h1 className="font-medium text-xl line-clamp-2">{name}</h1>
        <p className="text-dark-grey">{username}</p>
      </div>
    </Link>
  )
}

export default UserCard
