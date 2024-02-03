"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useScrollListener from "./useScroll";
import { motion } from "framer-motion";
import ChangeTheme from "../../change-theme";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const [navClassList, setNavClassList] = useState([]);
  const scroll = useScrollListener();
  const pathname = usePathname();
  const [show, setShow] = useState();

  useEffect(() => {
    const _classList = [];
    if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
      _classList.push("-translate-y-full");
    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  const handleClick = () => {
    setShow(!show);
  };
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split("  ")[0];
  }
  return (
    <div
      className={`navbar rounded-box z-10 !h-10 min-h-10 bg-gray-100/35 dark:bg-black/25 dark:text-black justify-between shadow-2xl sticky top-0 transition-transform duration-300 ease-in-out
        ${navClassList.join(" ")}`}>
      <div className='order-3 lg:order-1 gap-x-2 lg:w-1/3 '>
        <Link
          href={"/"}
          className='md:text-xl text-best dark:text-darkBest font-extrabold hidden md:inline-flex'>
          mj Pizza
        </Link>
        <ChangeTheme />
        <div className='menuButton'>
          <div
            tabIndex={0}
            onClick={handleClick}
            role='button'
            className='lg:hidden flex flex-col justify-center items-center'>
            <span
              className={`bg-gray-800 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${show ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                }`}></span>
            <span
              className={`bg-gray-800 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${show ? "opacity-0" : "opacity-100"
                }`}></span>
            <span
              className={`bg-gray-800 block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${show ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                }`}></span>
          </div>
          <motion.ul
            animate={show ? "open" : "closed"}
            variants={variants}
            tabIndex={0}
            className={`absolute  left-0 lg:hidden  menu menu-sm dropdown-content z-10 mt-3 p-2 shadow bg-base-100 rounded-box w-28 `}>
            <li className={`duration-[1000ms] ease-linear transition-transform `}>
              <Link href={"/"}>Home</Link>
            </li>
            <li className={`duration-[1500ms] ease-linear transition-transform `}>
              <Link href={"/menu"}>Menu</Link>
            </li>
            <li className={`duration-[2000ms] ease-linear transition-transform `}>
              <Link href={"/about"}>About</Link>
            </li>
            <li className={`duration-[2500ms] ease-linear transition-transform `}>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </motion.ul>
        </div>
      </div>
      <div className='order-2 w-1/3 flex lg:justify-center'>
        {status === "authenticated" && (
          <div className=' flex gap-2'>
            <button
              onClick={() => signOut()}
              className='text-xs md:text-sm btn btn-sm btn-outline bg-best dark:bg-darkBest text-white rounded-xl dark:border-0'>
              Logout
            </button>
            <Link
              className='flex text-xs lg:text-base whitespace-nowrap items-center dark:text-darkBest'
              href={"/profile"}>
              Hello, {userName}
            </Link>
          </div>
        )}
        {status === "loading" && (
          <button className='text-xs md:text-sm btn items-center btn-sm btn-outline bg-best dark:bg-darkBest text-white rounded-xl px-8'>
            <div className=' loading loading-spinner loading-sm'></div>
          </button>
        )}
        {status === "unauthenticated" && (
          <>
            <Link
              href={"/register"}
              className='text-xs md:text-sm btn btn-sm btn-outline bg-best dark:bg-darkBest dark:border-0 text-white rounded-xl'>
              Register
            </Link>
            <Link
              className='text-xs md:text-sm ms-2 dark:text-gray-300'
              href={"/login"}>
              Login
            </Link>
          </>
        )}
      </div>
      <div className='order-1 lg:order-3 hidden lg:flex w-1/3 justify-end '>
        <ul className=' flex gap-4 *:text-sm dark:*:text-gray-100 *:text-gray-700 hover:*:text-gray-400 hover:*:translate-y-1 *:transition *:duration-300 px-2'>
          <li>
            <Link href={"/contact"}>
              <div
                className={` ${pathname === "/contact" ? "border-b-2 border-orange-600" : ""
                  }`}>
                Contact
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/about"}>
              <div
                className={` ${pathname === "/about" ? "border-b-2 border-orange-600" : ""
                  }`}>
                About
              </div>
            </Link>
          </li>
          <li>
            <Link href={"/menu"}>
              <div
                className={` ${pathname === "/menu" ? "border-b-2 border-orange-600" : ""
                  }`}>
                Menu
              </div>
            </Link>
          </li>
          <li>
            <Link
              passHref
              href={"/"}>
              <div
                className={` ${pathname === "/" ? "border-b-2 border-orange-600" : ""
                  }`}>
                Home
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
