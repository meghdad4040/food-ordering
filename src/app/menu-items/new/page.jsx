"use client"

import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowCircleLeft } from "react-icons/fa";



const page = () => {
 const { loading, data } = useProfile()
 const [redirectToItems, setRedirectToItems] = useState(false)


 const handleFormSubmit = async (e, data) => {
  e.preventDefault();
  const savingPromise = new Promise(async (resolve, reject) => {
   const response = await fetch("/api/menu-items", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
   });
   if (response.ok) {
    resolve();
   } else {
    reject();
   }
  });
  await toast.promise(savingPromise, {
   loading: "saving ...",
   success: "saving Items ok 👌",
   error: "error in saving 🤯",
  });
  setRedirectToItems(true)
 }

 if (redirectToItems) {
  return redirect("/menu-items")
 }
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
  <section className=" mt-8">
   <UserTabs isAdmin={data.isAdmin} />
   <div className="max-w-xl mx-auto mt-8">
    <Link className="btn btn-outline btn-sm w-full" href={"/menu-items"}>
     <FaArrowCircleLeft />
     <span> Show all menu item</span>
    </Link>
   </div>
   <div className="max-w-xl mx-auto mt-8">
    <MenuItemForm onSubmit={handleFormSubmit} />
   </div>
  </section>
 );
}

export default page;