"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const UserTabs = ({ isAdmin }) => {
  const path = usePathname()
  return (
    <div className=" *:text-[0.65rem] md:*:text-sm flex mx-auto gap-2 usertab  justify-center">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>Profile</Link>
      {isAdmin && (
        <>
          <Link className={path === "/categories" ? "active" : ""} href={"/categories"}>Categories</Link>
          <Link className={path.includes("/menu-items") ? "active" : ""} href={"/menu-items"}>Menu Items</Link>
          <Link className={path === "/users" ? "active" : ""} href={"/users"}>Users</Link>
          <Link className={path === "/order" ? "active" : ""} href={"/order"}>Order</Link>
        </>
      )}
    </div>
  );
}

export default UserTabs;