"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ChangeTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);

  const changeThemeHandler = () => {
    if (!mounted) return null;
    if (currentTheme === "dark") {
      return setTheme("light");
    } else {
      return setTheme("dark");
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <label className='cursor-pointer grid place-items-center'>
      <input
        onClick={changeThemeHandler}
        type='checkbox'
        value='synthwave'
        className='toggle  theme-controller bg-yellow-400 dark:bg-gray-400  row-start-1 col-start-1 col-span-2'
      />
      <svg
        className='col-start-1 row-start-1 stroke-base-100 fill-base-100'
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='14'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <circle
          cx='12'
          cy='12'
          r='5'
        />
        <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
      </svg>
      <svg
        className='col-start-2 row-start-1 stroke-base-100 fill-base-100'
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='14'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
      </svg>
    </label>
  );
};

export default ChangeTheme;
