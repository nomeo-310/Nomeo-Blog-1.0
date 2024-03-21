"use client";

import React from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { BsPerson, BsColumnsGap, BsGear, BsBoxArrowInRight, BsFileEarmarkText } from "react-icons/bs";
import { signOut } from "next-auth/react";
import UserNavItem from "./UserNavItem";
import { userProps } from "@/types/types";

interface Props {
  currentUser: userProps | null;
}

const UserNavigation = ({ currentUser }: Props) => {
  return (
    <AnimationWrapper transition={{ duration: 0.2 }} className="absolute right-0 z-50 rounded mt-1">
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200 rounded">

        <div className="md:hidden">
          <UserNavItem label="Write" path="/editor" icon={BsFileEarmarkText}/>
        </div>
        <UserNavItem label="Profile" path={`/users/${currentUser?._id}`} icon={BsPerson}/>
        <UserNavItem label="Dashboard" path="/dashboard/blogs" icon={BsColumnsGap} />
        <UserNavItem label="Settings" path="/settings/edit-profile" icon={BsGear} />

        <hr className="border-grey" />
        <button className="p-4 w-full pl-8 py-4 hover:bg-grey text-left" onClick={() => signOut()}>
          <p className="md:text-xl text-lg font font-semibold mb-1">SignOut</p>
          <p className="text-lg line-clamp-1 text-black/50">
            { currentUser?.username ? currentUser.username : currentUser?.name }
          </p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigation;
