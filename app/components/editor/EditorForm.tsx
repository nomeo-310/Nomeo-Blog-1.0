"use client";

import Link from "next/link";
import React from "react";

interface Props {}

const EditorForm = (props: Props) => {
  return (
    <React.Fragment>
      <nav className="z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white">
        <Link href="/" className="text-red">
          home
        </Link>
      </nav>
    </React.Fragment>
  );
};

export default EditorForm;
