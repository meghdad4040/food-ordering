"use client"

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const page = () => {

 const { loading, data } = useProfile()
 const [menuItems, setMenuItems] = useState([])

 useEffect(() => {
  axios("/api/menu-items").then(res => {
   setMenuItems(res.data)
  })
  // fetch("/api/menu-items").then(res => {
  //  res.json().then(menuItems => {
  //   setMenuItems(menuItems)
  //  })
  // })
 }, []);


 if (loading) {
  return "Loading user info ..."
 }
 if (!data.isAdmin) {
  return (
   <div className=" mt-8 max-w-xl mx-auto">
    <p className=" font-semibold text-2xl text-center">Not an admin</p>
   </div>
  )
 }
 return (
  <section className="max-w-xl mx-auto mt-8">
   <UserTabs isAdmin={data.isAdmin} />
   <div className="mt-8">
    <Link className=" btn btn-outline btn-sm w-full" href={"/menu-items/new"}>
     <span> Create new menu item</span>
     <FaArrowCircleRight />
    </Link>
   </div>
   <div>
    <h2 className=" text-sm text-gray-500 dark:text-gray-300 mt-8">
     Edit menu item:
    </h2>
    <div className=" grid grid-cols-3 gap-2 my-4">
     {menuItems?.length > 0 && menuItems.map(item => (
      <Link className=" flex flex-col justify-center items-center btn btn-outline h-auto w-full hover:shadow-lg hover:shadow-black dark:hover:shadow-gray-400 hover:scale-105"
       href={"/menu-items/edit/" + item._id}
       key={item._id}>
       <Image priority={true}
        src={item.image}
        alt="item image"
        className=" w-28 h-28 p-2 rounded-box"
        width={100}
        height={150} />
       <div className=" mb-4">{item.name}</div>
      </Link>
     ))}
    </div>
   </div>
  </section>
 );
}

export default page;