"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface animationWrapperProps {
  children: React.ReactNode;
  initial?: any;
  animate?: any;
  transition?: any;
  keyValue?: string;
  className?: string;
}

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 2 },
  keyValue,
  className,
}: animationWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        key={keyValue}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
