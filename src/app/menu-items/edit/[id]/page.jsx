"use client"

import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowCircleLeft } from "react-icons/fa";

const page = () => {
 const { id } = useParams()
 const { loading, data } = useProfile()
 const [menuItem, setMenuItem] = useState(null)
 const router = useRouter()


 useEffect(() => {
  fetchData()
 }, []);

 const fetchData = async () => {
  await axios("/api/menu-items").then((res) => {
   const items = res.data
   const item = items.find(i => i._id === id)
   setMenuItem(item)
  })
 }

 const handleFormSubmit = async (e, data) => {
  e.preventDefault();
  data = { ...data, _id: id }
  const savingPromise = new Promise(async (resolve, reject) => {
   const response = await fetch("/api/menu-items", {
    method: "PUT",
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
  setTimeout(() => {
   router.push("/menu-items")
  }, 3000);
 }

 const handleDeleteItem = async () => {
  const deletingPromise = new Promise(async (resolve, reject) => {
   const response = await fetch("/api/menu-items", {
    method: "DELETE",
    body: JSON.stringify({ _id: id }),
    headers: { "Content-type": "application/json" },
   });
   if (response.ok) {
    resolve();
   } else {
    reject();
   }
  });
  await toast.promise(deletingPromise, {
   loading: "deleting ...",
   success: "delete Items ok 👌",
   error: "error in deleting 🤯",
  });
  setTimeout(() => {
   router.push("/menu-items")
  }, 3000);
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
   <MenuItemForm onSubmit={handleFormSubmit} onDelete={handleDeleteItem} menuItem={menuItem} />
  </section>
 );
}

export default page;