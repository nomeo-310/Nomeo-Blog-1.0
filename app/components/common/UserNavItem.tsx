import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

export interface userNavItemProps {
  path:string
  icon:IconType
  label:string
  onClick?:() => void
}

const UserNavItem = ({path, icon:Icon, label, onClick}: userNavItemProps) => {
  return (
    <Link href={path} className="flex gap-2 link pl-8 py-4" onClick={onClick}>
      <Icon className="text-xl" />
      <p>{label}</p>
    </Link>
  )
}

export default UserNavItem
