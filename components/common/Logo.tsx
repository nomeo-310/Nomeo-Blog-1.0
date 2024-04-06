"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GiQuill } from "react-icons/gi"

const Logo = () => {
  return (
    <Link className="w-9 h-9 md:h-10 md:w-10 relative" href="/">
      <GiQuill className="text-3xl lg:text-4xl dark:text-white"/>
    </Link>
  );
};

export default Logo;
