"use client";

import React from "react";
import Logo from "../common/Logo";
import AnimationWrapper from "../common/AnimationWrapper";

const EditorForm = () => {
  return (
    <React.Fragment>
      <nav className="navbar">
        <Logo />
        <p className="max-md:hidden line-clamp-1 w-full">New Blog</p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-4 border-grey rounded hover:opacity-80"></div>
          </div>
        </section>
      </AnimationWrapper>
    </React.Fragment>
  );
};

export default EditorForm;
