'use client'

import { fetchNotifications } from '@/libs/actions/notification.action';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import Loader from '../common/Loader';
import AnimationWrapper from '../common/AnimationWrapper';
import NoBlogPostMessage from '../home/NoBlogPostMessage';
import NotificationCard from './NotificationCard';
import LoadMoreNotifications from './LoadMoreNotifications';

export type notificationsProps = {
  count: number
  page: number
  data: notification[]
}

export type notification = {
  _id: string
  createdAt: string
  seen: boolean
  type: string
  comment?: { _id: string, comment: string }
  user: { _id: string, name: string, username: string, image: string }
  repliedOnComment?: {_id: string, comment: string }
  blog: {_id:string, title: string , author: string}
}

const NotificationClient = () => {
  const pathname = usePathname();
  const router = useRouter()

  const [filter, setFilter] = React.useState('all');
  const filters = ['all', 'reply', 'comment', 'like'];

  const [notifications, setNotifications] = React.useState<notificationsProps | null>(null);
  const [moreNotifications, setMoreNotifications] = React.useState<notificationsProps | null>(null);

  const handleFilter = (event:any) => {
    let btnTarget = event.target;
    setFilter(btnTarget.innerHTML)
  }

  const getNotifications = React.useCallback(async({page}:{page:number}) => {
    try {
      await fetchNotifications({page: page, filter: filter, path: pathname})
      .then((response) => {
      setNotifications(response)
      router.refresh();
    })
    } catch (error) {
      console.log(error);
    }

  }, [filter, pathname, router]);

  const getMoreNotifications = React.useCallback(async({page}:{page:number}) => {
    try {
      await fetchNotifications({page: page, filter: filter, path: pathname})
      .then((response) => {
      setMoreNotifications(response)
      router.refresh();
    })
    } catch (error) {
      console.log(error);
    }

  }, [filter, pathname, router]);

  React.useEffect(() => {
    if (filter) {
      getNotifications({page: 1})
    }
  }, [filter, getNotifications]);

  React.useEffect(() => {
    if (moreNotifications !== null && notifications !== null) {
      setNotifications({...notifications, data: [...notifications.data, ...moreNotifications.data], page: moreNotifications.page})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreNotifications]);

  return (
    <div>
      <h1 className='max-md:hidden dark:text-white'>Recent Notifications</h1>
      <div className="my-8 flex gap-6">
        {filters.map((filterName:string, index:number) => (
          <button className={'py-2 ' + (filter === filterName ? 'btn-dark dark:bg-red': 'btn-light dark:text-black')} key={index} onClick={handleFilter}>{filterName}</button>
          ))
        }
      </div>
      { notifications === null ? <Loader/> : 
          <React.Fragment>
            { notifications.data.length > 0 ? notifications.data.map((item:notification, index:number) => (
              <AnimationWrapper key={index} transition={{ delay: index*0.08 }}>
                <NotificationCard notification={item}/>
              </AnimationWrapper>
              )) : <NoBlogPostMessage message='No notifications yet'/>
            }
            <LoadMoreNotifications currentData={notifications} getMoreNotifications={getMoreNotifications}/>
          </React.Fragment>
        }
    </div>
  )
}

export default NotificationClient