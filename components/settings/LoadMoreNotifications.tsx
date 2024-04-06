'use client'

import React from 'react'
import { notificationsProps } from './NotificationClient'

interface props {
  currentData: notificationsProps | null
  getMoreNotifications: ({ page }:{page:number}) => void;
}

const LoadMoreNotifications = ({currentData, getMoreNotifications }:props) => {

  if (currentData !== null && currentData.count > currentData.data.length) {
    return (
      <button className='tag bg-black text-white dark:bg-grey dark:text-black my-5' 
        onClick={() => getMoreNotifications({page: currentData.page + 1})}
      >
        Load more 
      </button>
    )
  }
}

export default LoadMoreNotifications