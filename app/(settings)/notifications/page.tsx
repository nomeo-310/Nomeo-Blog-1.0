import React from "react";
import { getSession } from "@/libs/actions/data.action";
import { fetchCurrentUser } from "@/libs/actions/user.action";
import { redirect } from "next/navigation";
import NotificationClient from "@/components/settings/NotificationClient";

const NotificationsPage = async () => {
  const currentUser = await fetchCurrentUser();
  const session = await getSession();

  const loggedIn = session && session.user && session.user.email === currentUser?.email;

  if (!loggedIn) {
    redirect("sign-in?next=/notifications");
  }

  return <NotificationClient />;
};

export default NotificationsPage;
