import React from "react";
import { fetchCurrentUser } from "@/libs/actions/user.action";
import { getSession } from "@/libs/actions/data.action";
import { redirect } from "next/navigation";
import ChangePasswordClient from "@/components/settings/ChangePasswordClient";

const ChangePasswordPage = async () => {
  const currentUser = await fetchCurrentUser();
  const session = await getSession();

  const loggedIn = session && session.user && session.user.email === currentUser.email;

  if (!loggedIn) {
    redirect("sign-in?next=/changepassword");
  }

  return <ChangePasswordClient />;
};

export default ChangePasswordPage;
