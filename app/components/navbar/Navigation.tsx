import { getCurrentUser } from "@/app/actions/data.action";
import React from "react";
import Navbar from "./Navbar";

interface Props {}

const MainNavigation = async (props: Props) => {
  const currentUser = await getCurrentUser();
  return (
    <React.Fragment>
      <Navbar currentUser={currentUser} />
    </React.Fragment>
  );
};

export default MainNavigation;
