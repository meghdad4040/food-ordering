"use client"


import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
 const { id } = useParams()
 const { loading, data } = useProfile()
 const [user, setUser] = useState(null)
 const router = useRouter()

 useEffect(() => {
  fetchData()
 }, []);

 // -------------fetchData by axios-------------
 const fetchData = async () => {
  await axios("/api/users").then((res) => {
   const users = res.data
   const user = users.find(u => u._id === id)
   setUser(user)
  })
 }
 // -------------fetchData by fetch-------------
 // const fetchData = async () =>{
 //  fetch("/api/users").then(res=>{
 //   res.json().then(users=>{
 //    const user = users.find(u => u._id === id)
 //    setUser(user)
 //   })
 //  })
 // }

 const handleSaveButtonClick = async (e, data) => {
  e.preventDefault();
  const savingPromise = new Promise(async (resolve, reject) => {
   const response = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify({ ...data, _id: id }),
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
   success: "user saved 👌",
   error: "error in saving 🤯",
  });
  setTimeout(() => {
   router.push('/users')
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
  <section className=" mt-8 mx-auto max-w-xl">
   <UserTabs isAdmin={data.isAdmin} />
   <div className=" mt-8">
    <UserForm user={user} onSave={handleSaveButtonClick} />
   </div>
  </section>
 );
}

export default page;