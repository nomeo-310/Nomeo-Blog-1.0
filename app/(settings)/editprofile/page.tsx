import React from "react";
import { fetchCurrentUser } from "@/libs/actions/user.action";
import { getSession } from "@/libs/actions/data.action";
import { redirect } from "next/navigation";
import EditProfileClient from "@/components/settings/EditProfileClient";

const EditProfilePage = async () => {
  const currentUser = await fetchCurrentUser();
  const session = await getSession();

  const loggedIn = session && session.user && session.user.email === currentUser.email;

  if (!loggedIn) {
    redirect("sign-in?next=/editprofile");
  }

  return <EditProfileClient currentUser={currentUser} />;
};

export default EditProfilePage;
