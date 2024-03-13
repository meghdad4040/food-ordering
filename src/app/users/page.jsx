"use client"

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {

 const { loading, data } = useProfile()
 const [users, setUsers] = useState([])


 const fetchData = async () => {
  await axios("/api/users").then((res) => {
   setUsers(res.data)
  })
 }

 useEffect(() => {
  fetchData()
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
  <section className=" max-w-xl mx-auto mt-8">
   <UserTabs isAdmin={data.isAdmin} />
   <div className="mt-8">
    {users?.length > 0 && users.map(user => (
     <div key={user._id} className="bg-gray-300 mx-auto max-w-[12rem] md:max-w-xl text-xs dark:bg-zinc-800 dark:text-slate-300 rounded-lg text-gray-700 mb-2 py-3 px-4 flex flex-col md:flex-row items-center gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:grow">
       <div className="text-center md:text-start">
        {!!user.name && (<span>{user.name}</span>)}
        {!user.name && (<span className=" italic">No name</span>)}
       </div>
       <span className=" text-gray-400">{user.email}</span>
      </div>
      <div>
       <Link href={"/users/" + user._id} className=" btn btn-xs btn-outline">
        Edit
       </Link>
      </div>
     </div>
    ))}
   </div>
  </section>
 );
}

export default page;