import React from "react";
import { fetchCurrentUser } from "@/libs/actions/user.action";
import { getSession } from "@/libs/actions/data.action";
import { redirect } from "next/navigation";
import ChangePasswordClient from "@/components/settings/ChangePasswordClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nomeo Blog 1.0 | Change Password",
  description: "Generated by create next app",
};

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
