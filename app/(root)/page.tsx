import React from "react";
import MainNavigation from "@/app/app-components/Navigation";
import HomeClient from "@/components/home/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nomeo Blog 1.0 | Home",
  description: "Generated by create next app",
};

export default async function Home() {

  return (
    <React.Fragment>
      <MainNavigation />
      <HomeClient />
    </React.Fragment>
  );
}
