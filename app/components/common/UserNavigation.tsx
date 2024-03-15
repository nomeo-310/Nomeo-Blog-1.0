"use client";

import React from "react";
import AnimationWrapper from "./AnimationWrapper";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { BsPerson, BsGrid1X2, BsGear, BsBoxArrowInRight } from "react-icons/bs";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import UserNavItem from "./UserNavItem";

interface Props {
  currentUser: User | null;
}

const UserNavigation = ({ currentUser }: Props) => {
  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50 rounded mt-1"
    >
      <div className="bg-white absolute right-0 border border-grey w-60 duration-200 rounded">
        <UserNavItem
          label="Write"
          path="/editor"
          icon={HiOutlineDocumentText}
        />
        <UserNavItem
          label="Profile"
          path={`/users/${currentUser?.id}`}
          icon={BsPerson}
        />
        <UserNavItem
          label="Dashboard"
          path="/dashboard/blogs"
          icon={BsGrid1X2}
        />
        <UserNavItem
          label="Settings"
          path="/settings/edit-profile"
          icon={BsGear}
        />
        <hr className="border-grey" />
        <button
          className="p-4 w-full pl-8 py-4 hover:bg-grey flex gap-2 items-center"
          onClick={() => signOut()}
        >
          <BsBoxArrowInRight className="text-2xl" />
          <p className="text-lg">
            {currentUser?.username ? "@" + currentUser.username : currentUser?.name}
          </p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigation;
