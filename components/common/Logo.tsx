"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="w-9 h-9 md:h-10 md:w-10 relative" href="/">
      <Image src="/images/logo.png" alt="logo" fill />
    </Link>
  );
};

export default Logo;
