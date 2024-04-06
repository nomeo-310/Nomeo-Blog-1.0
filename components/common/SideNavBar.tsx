"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {BsFileEarmark, BsFileEarmarkText, BsBell, BsPerson, BsLock} from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";

const SideNavBar = ({ children, notificationCounts }: { children: React.ReactNode, notificationCounts: number | null | undefined }) => {
  const currentPath = usePathname();

  const pathNameRenderer = () => {
    const shortenedPath = currentPath.split("/")[1];

    if (shortenedPath === 'editprofile') {
      return 'edit profile';
    } else if (shortenedPath === 'changepassword') {
      return 'change password';
    } else {
      return shortenedPath;
    }
  }

  const [pageState, setPageState] = React.useState(pathNameRenderer());
  const [showSideNavigation, setShowSideNavigation] = React.useState(false);

  const notificationAvailable = notificationCounts !== null && notificationCounts !== undefined && notificationCounts > 0;

  let activeTabLine = React.useRef<any>();
  let sideBarIcon = React.useRef<any>();
  let pageStateTab = React.useRef<any>();

  const changePageState = (e:any) => {
    const { offsetLeft, offsetWidth } = e.target;

    activeTabLine.current.style.width = offsetWidth + 'px'
    activeTabLine.current.style.left = offsetLeft + 'px';

    if (e.target === sideBarIcon.current) {
      setShowSideNavigation(true)
    } else {
      setShowSideNavigation(false)
    }   
  }

  React.useEffect(() => {
    setShowSideNavigation(false);
    pageStateTab.current.click()
  }, [pageState]);

  return (
    <React.Fragment>
      <section className="relative flex gap-8 py-0 m-0 max-md:flex-col">
        <div className="sticky top-[80px] z-30">
          <div className="md:hidden bg-white dark:bg-[#121212] py-1 border-b border-grey flex flex-nowrap overflow-x-auto">
            <button className="p-4 px-5 capitalize dark:text-white" ref={sideBarIcon} onClick={changePageState}>
              <CiMenuFries className="text-2xl pointer-events-none" />
            </button>
            <button className="p-4 px-5 capitalize dark:text-white" ref={pageStateTab} onClick={changePageState}>
              {pageState}
            </button>
            <hr className="absolute bottom-0 duration-500 dark:border-red" ref={activeTabLine}/>
          </div>
          <div className={"min-w-[200px] h-[calc(100vh-80px-60px)] md:h-cover md:sticky top-24 overflow-x-auto p-5 md:pr-0 md:border-grey dark:bg-[#121212] md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 " + (!showSideNavigation ? 'max-md:opacity-0 max-md:pointer-events-none' : 'pointer-events-auto opacity-100')}>
            <h1 className="text-dark-grey text-xl mb-3 dark:text-white">Dashboard</h1>
            <hr className="border border-grey -ml-6 mb-8 mr-6" />
            <Link href="/blogs" className={ "sidebar-link " + (currentPath.split("/")[1] === "blogs" ? "active" : "")} onClick={(e: any) => setPageState(e.target.innerText)}>
              <BsFileEarmark className="text-xl" />
              Blogs
            </Link>
            <Link href="/notifications" className={ "sidebar-link " + (currentPath.split("/")[1] === "notifications" ? "active" : "")} onClick={(e: any) => setPageState(e.target.innerText)}>
              <div className="relative">
                <BsBell className="text-xl" />
                {notificationAvailable && (
                  <div className="flex items-center justify-center absolute -right-3 -top-2 bg-red text-white w-4 h-4 rounded-full max-md:hidden">
                    <p className="md:text-sm text-xs">{notificationCounts}</p>
                  </div>
                )}
              </div>
              Notifications
            </Link>
            <Link href="/editor"  className={"sidebar-link " + (currentPath.split("/")[1] === "editor" ? "active" : "")} onClick={(e: any) => setPageState(e.target.innerText)}>
              <BsFileEarmarkText className="text-xl" />
              Write
            </Link>

            <h1 className="text-dark-grey text-xl mb-3 mt-20 dark:text-white">Settings</h1>
            <hr className="border border-grey -ml-6 mb-8 mr-6" />
            <Link
              href="/editprofile"
              className={
                "sidebar-link " +
                (currentPath.split("/")[1] === "editprofile" ? "active" : "")
              }
              onClick={(e: any) => setPageState(e.target.innerText)}
            >
              <BsPerson className="text-xl" />
              Edit Profile
            </Link>
            <Link
              href="/changepassword"
              className={
                "sidebar-link " +
                (currentPath.split("/")[1] === "changepassword" ? "active" : "")
              }
              onClick={(e: any) => setPageState(e.target.innerText)}
            >
              <BsLock className="text-xl" />
              Change Password
            </Link>
          </div>
        </div>
        <div className="max-md:-mt-8 mt-5 w-full">{children}</div>
      </section>
    </React.Fragment>
  );
};

export default SideNavBar;
