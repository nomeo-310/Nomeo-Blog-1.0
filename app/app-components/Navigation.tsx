import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { fetchCurrentUser } from "@/libs/actions/user.action";
import { fetchNotificationCount } from "@/libs/actions/notification.action";

const MainNavigation = async () => {
  const currentUser = await fetchCurrentUser();
  const notifications = await fetchNotificationCount();
  
  const counts = notifications && notifications.counts;
  
  return (
    <React.Fragment>
      <Navbar currentUser={currentUser} notificationCounts={counts}/>
    </React.Fragment>
  );
};

export default MainNavigation;
