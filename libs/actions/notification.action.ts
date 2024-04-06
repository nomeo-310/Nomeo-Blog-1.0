'use server'

import { revalidatePath } from "next/cache";
import Notification from "../models/Notifications";
import connectToDatabase from "../utils/connectDatabase"
import { getCurrentUser } from "./data.action";


export const fetchNotificationCount = async () => {
  await connectToDatabase();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null
  }

  let query = {notificationFor: currentUser._id, seen: false, user: { $ne: currentUser._id }}

  try {
    const notificationCount = await Notification.countDocuments(query)
    return { counts: notificationCount }
  } catch (error) {
    return {error: 'Internal server error'}
  }
}

export const fetchNotifications = async ({page, filter, path}:{page:number, filter: string, path: string}) => {
  await connectToDatabase();

  let query
  const maxLimit = 4;
  const skip = (+page - 1) * maxLimit;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null
  }

  if (filter === 'all') {
    query = { notificationFor: currentUser._id, user: { $ne: currentUser._id }}
  } else {
    query = { notificationFor: currentUser._id, type: filter, user: { $ne: currentUser._id }}
  }

  try {
    const notificationCount =  await Notification.countDocuments(query);

    await Notification.updateMany(query, {seen: true});

    const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .populate('blog', 'title _id author')
    .populate('user', 'image username name _id')
    .populate('comment', 'comment')
    .populate('repliedOnComment', 'comment')
    .populate('reply', 'comment')
    .select('createdAt type seen reply comment')
    .skip(skip)
    .limit(maxLimit)

    const notificationData = { count: notificationCount, page: page, data: notifications };

    const data = JSON.parse(JSON.stringify(notificationData));
    revalidatePath(path)
    return data;
  } catch (error) {
    return {error: 'Internal server error'}
  }
}