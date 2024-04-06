'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { BsMoonStars, BsBrightnessHigh, BsWindow } from 'react-icons/bs';


const ThemeToggler = () => {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme()

  React.useEffect(() =>  setMounted(true), []);

  if (!mounted) return (
    <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-grey">
      <BsWindow className="text-xl text-dark-grey" />
    </div>
    );

    if (resolvedTheme === 'dark') {
      return (
        <button className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-grey" onClick={() => setTheme('light')}>
          <BsBrightnessHigh className="text-xl text-dark-grey" />
        </button>
      )
    }
  
    if (resolvedTheme === 'light') {
      return (
      <button className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-grey" onClick={() => setTheme('dark')}>
        <BsMoonStars className="text-xl text-dark-grey" />
      </button>
      )
    }

}

export default ThemeToggler