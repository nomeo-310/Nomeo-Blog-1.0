import React from "react";
import UserClient from "@/components/users/UserClient";
import { getCurrentUser } from "@/libs/actions/data.action";
import MainNavigation from "@/app/app-components/Navigation";
import { fetchUser } from "@/libs/actions/user.action";

const UserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getCurrentUser();
  const pageUser = await fetchUser({userId: id});
  const currentUser = JSON.parse(JSON.stringify(user));

  return (
    <React.Fragment>
      <MainNavigation />
      <UserClient userId={id} currentUser={currentUser} pageUser={pageUser}/>
    </React.Fragment>
  );
};

export default UserPage;
