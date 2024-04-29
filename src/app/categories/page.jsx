"use client"

import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const page = () => {

 const { loading: profileLoading, data: profileData } = useProfile()
 const [category, setCategory] = useState([])
 const [categoryName, setCategoryName] = useState("")
 const [editedCategory, setEditedCategory] = useState(null)

 useEffect(() => {
  fetchCategories()
 }, []);

 const fetchCategories = () => {
  axios("/api/categories").then(res => {
   setCategory(res.data)
  })
 }

 const handleCategory = async (e) => {
  e.preventDefault()
  const creationPromise = new Promise(async (resolve, reject) => {
   const data = { name: categoryName };
   if (editedCategory) {
    data._id = editedCategory._id
   }
   const response = await fetch("/api/categories", {
    method: editedCategory ? "PUT" : "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data)
   })
   setCategoryName("");
   fetchCategories();
   setEditedCategory(null);
   if (response.ok) {
    resolve()
   } else {
    reject()
   }
  })
  await toast.promise(creationPromise, {
   loading: editedCategory ? "Updating ..." : "loading ...",
   success: editedCategory ? "update ok 👌" : "create successfully 👌",
   error: editedCategory ? "update Error" : "error in creating 🤯",
  })
 }

 const handleDeleteCategory = async (_id) => {
  const deletingPromise = new Promise(async (resolve, reject) => {
   const response = await fetch("/api/categories?_id=" + _id, {
    method: "DELETE",
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
   success: "delete ok 👌",
   error: "error in deleting 🤯",
  });
  fetchCategories()
 }

 if (profileLoading) {
  return (
   <section className="mt-8 max-w-lg mx-auto">
    <div className=" flex gap-2 w-full" >
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-12 w-1/4 rounded-full"></div>
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-12 w-1/4 rounded-full"></div>
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-12 w-1/4 rounded-full"></div>
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-12 w-1/4 rounded-full"></div>
    </div>
    <div className=" mt-8 flex gap-2 w-full">
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-12 w-3/4"></div>
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-12 w-1/4"></div>
    </div>
    <div className=" mt-8 flex flex-col gap-2">
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-8"></div>
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-8"></div>
     <div className="skeleton bg-gray-400 dark:bg-gray-950 h-8"></div>
    </div>
   </section>
  )
 }
 if (!profileData.isAdmin) {
  return (
   <div className=" mt-8 max-w-lg mx-auto">
    <p className=" font-semibold text-2xl text-center">Not an admin</p>
   </div>
  )
 }
 return (
  <section className="mt-8 max-w-xl mx-auto">
   <UserTabs isAdmin={profileData.isAdmin} />
   <form className=" mt-8" onSubmit={handleCategory}>
    <div className=" flex gap-2 items-center">
     <div className=" grow">
      <label className="text-sm text-gray-500 dark:text-gray-300">
       {editedCategory ? "Update category" : "New category name"}
       {editedCategory && (
        <>: <b>{editedCategory.name}</b></>
       )}
      </label>
      <input type="text" value={categoryName}
       onChange={(e) => setCategoryName(e.target.value)}
      />
     </div>
     <div className=" flex gap-2">
      <button className="block mt-4 px-6 py-2 rounded-xl" type="submit">
       {editedCategory ? "Update" : "Create"}
      </button>
      <button type="button"
       className=" bg-rose-500 border-rose-600 hover:bg-red-400 text-white hover:text-black"
       onClick={() => {
        setCategoryName("")
        setEditedCategory(null)
       }}>Cancel</button>
     </div>
    </div>
   </form>
   <div>
    <h1 className=" mt-8 text-sm text-gray-500 dark:text-gray-300">Edit category:</h1>
    {
     category?.length > 0 && category.map(c => (
      <div className=" bg-gray-200 dark:bg-slate-500 text-gray-500 dark:text-gray-800 rounded-xl p-2 px-4 flex gap-1 my-2"
       key={c._id}>
       <div className="grow" >
        {c.name}
       </div>
       <div className="flex gap-2">
        <button onClick={() => {
         setEditedCategory(c);
         setCategoryName(c.name);
        }}
         type="button"
         className=" btn btn-success text-white hover:text-black btn-xs shadow-2xl duration-300">
         Edit
        </button>
        <DeleteButton className={"btndelete"} label={"Delete"} onDelete={() => handleDeleteCategory(c._id)} />
       </div>
      </div>
     ))
    }
   </div>
  </section>
 );
}

export default page;