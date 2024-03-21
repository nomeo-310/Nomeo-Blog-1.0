"use client";

import React from "react"; 
import Link from "next/link";
import { BsSearch, BsBell, BsFileEarmarkText } from "react-icons/bs";
import ImageAvatar from "../common/ImageAvatar";
import UserNavigation from "./UserNavigation";
import Logo from "../common/Logo";
import { userProps } from "@/types/types";

interface navBarProps {
  currentUser: userProps | null; 
}

const Navbar = ({ currentUser }: navBarProps) => {
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [showUserNavbar, setShowUserNavBar] = React.useState(false);

  const notificationAvailable = false;

  const toggleUserNavBar = React.useCallback(() => {
    setShowUserNavBar((prev) => !prev);
  }, []);

  const toggleSearchBar = React.useCallback(() => {
    setShowSearchBar((prev) => !prev);
  }, []);

  const handleOnBlur = React.useCallback(() => {
    setTimeout(() => {
      setShowUserNavBar(false);
    }, 200);
  }, []);

  return (
    <nav className="navbar">

      <Logo />

      <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-gray py-4 px-[5vw] md:relative md:inset-0 md:border-0 md:block md:p-0 md:w-auto md:show " + (showSearchBar ? "show" : "hide")}>
        <input type="text" placeholder="Search" className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"/>
        <BsSearch className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey" />
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-grey" onClick={toggleSearchBar}>
          <BsSearch className="text-xl text-dark-grey" />
        </button>

        <Link href="/editor" className="hidden md:flex gap-2 link rounded-full">
          <BsFileEarmarkText className="text-xl" />
          <p>Write</p>
        </Link>

        { currentUser ? (
          <React.Fragment>
            <Link href="/dashboard/notification">
              <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/20 flex items-center justify-center">
                <BsBell size={22} />
                {notificationAvailable && (
                  <span className="absolute top-1 right-0 block bg-red w-[13px] h-[13px] rounded-full" />
                )}
              </button>
            </Link>
            <div className="relative" onClick={toggleUserNavBar} onBlur={handleOnBlur}>
              <ImageAvatar image={currentUser.image || ""} />
              {showUserNavbar && <UserNavigation currentUser={currentUser} />}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link href="/sign-in" className="btn-dark py-2">
              Sign In
            </Link>
            <Link href="/sign-up" className="btn-light py-2 hidden md:block">
              Sign Up
            </Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
