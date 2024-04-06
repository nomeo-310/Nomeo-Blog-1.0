"use client";

import React from "react"; 
import Link from "next/link";
import { BsSearch, BsBell, BsFileEarmarkText } from "react-icons/bs";
import ImageAvatar from "../common/ImageAvatar";
import UserNavigation from "./UserNavigation";
import Logo from "../common/Logo";
import { userProps } from "@/types/types";
import { useRouter } from "next/navigation";
import ThemeToggler from "../common/ThemeToggler";

interface navBarProps {
  currentUser: userProps | null;
  notificationCounts: number | null | undefined
}

const Navbar = ({ currentUser, notificationCounts }: navBarProps) => {
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [showUserNavbar, setShowUserNavBar] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  const notificationAvailable = notificationCounts !== undefined && notificationCounts !== null && notificationCounts > 0;

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

  const createSearchQuery = (event:React.ChangeEvent<HTMLInputElement>) => {
    let querText = event.target;
    setQuery(querText.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.length) {
      event.preventDefault();
      router.push(`/search/${query}`)
    }
  };

  return (
    <nav className="navbar z-50 dark:bg-[#343434]">

      <Logo />

      <div className={"absolute bg-white dark:bg-[#343434] w-full left-0 top-full mt-0.5 border-b border-gray py-4 px-[5vw] md:relative md:inset-0 md:border-0 md:block md:p-0 md:w-auto md:show " + (showSearchBar ? "show" : "hide")}>
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12" 
          onKeyDown={handleKeyDown}
          value={query}
          onChange={createSearchQuery}
        />
        <BsSearch className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey" />
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button className="md:hidden w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-grey" onClick={toggleSearchBar}>
          <BsSearch className="text-xl text-dark-grey" />
        </button>

        <Link href="/editor" className="hidden md:flex gap-2 link rounded-full">
          <BsFileEarmarkText className="text-xl" />
          <p>Write</p>
        </Link>

        <ThemeToggler/>

        { currentUser ? (
          <React.Fragment>
            <Link href="/notifications">
              <button className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-grey relative hover:bg-black/20 dark:hover:bg-grey flex items-center justify-center">
                <BsBell size={22} />
                {notificationAvailable && (
                  <div className="flex items-center justify-center absolute -right-1 -top-1 md:right-0 bg-red text-white w-5 h-5 rounded-full p-1">
                    <p className="md:text-sm text-xs">{notificationCounts}</p>
                  </div>
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
            <Link href="/sign-up" className="btn-light dark:text-black py-2 hidden md:block">
              Sign Up
            </Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
