import React from "react";
import HomeClient from "@/components/home/HomeClient";
import { Metadata } from "next";
import MainNavigation from "../app-components/Navigation";
import { getCurrentUser } from "@/libs/actions/data.action";

export const metadata: Metadata = {
  title: "Nomeo Blog 1.0 | Home",
  description: "Generated by create next app",
};

export default async function Home() {
  const currentUser = await getCurrentUser();
  const plainCurrentUser = JSON.parse(JSON.stringify(currentUser ));

  return (
    <React.Fragment>
      <MainNavigation />
      <HomeClient currentUserId={plainCurrentUser?._id} />
    </React.Fragment>
  );
}
