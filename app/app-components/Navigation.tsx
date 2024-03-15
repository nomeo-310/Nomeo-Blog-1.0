import { getCurrentUser } from "@/libs/actions/data.action";
import React from "react";
import Navbar from "../../components/navbar/Navbar";

const MainNavigation = async () => {
  const currentUser = await getCurrentUser();
  return (
    <React.Fragment>
      <Navbar currentUser={currentUser} />
    </React.Fragment>
  );
};

export default MainNavigation;
