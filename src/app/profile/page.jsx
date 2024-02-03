"use client";

import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import SkeletonLine from "react-loading-skeleton";

const page = () => {
 const session = useSession();
 const [isAdmin, setIsAdmin] = useState(false);
 const [profileFetched, setProfileFetched] = useState(false);
 const [user, setUser] = useState(null)
 const { status } = session;
 console.log(session);

 const handelProfileUpdate = async (e, data) => {
  e.preventDefault();
  const savingPromise = new Promise(async (resolve, reject) => {
   const response = await fetch("/api/profile", {
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
   success: "profile saved 👌",
   error: "error in saving 🤯",
  });
 };


 useEffect(() => {
  if (status === "authenticated") {
   axios("/api/profile").then(res => {
    console.log(res.data)
    setUser(res.data)
    setIsAdmin(res.data.isAdmin)
    setProfileFetched(true)
   })
   // fetch("/api/profile").then(response => {
   //  response.json().then(data => {
   //   console.log(data)
   //   setPhone(data.phone)
   //   setStreetAddress(data.streetAddress)
   //   setCity(data.city)
   //   setCountry(data.country)
   //   setPostalCode(data.postalCode)
   //   setImage(data.image)
   //   setIsAdmin(data.isAdmin)
   //   setProfileFetched(true)
   //  })
   // })
  }
 }, [session, status]);

 // if (status === "loading" || !profileFetched) {
 //  return (
 //   <section className='mt-8'>
 //    {/* User Tabs (skeleton) */}
 //    <div className='skeleton-user-tabs' />

 //    {/* Profile details (skeleton) */}
 //    <div className='max-w-lg mx-auto mt-8'>
 //     <div className='skeleton-profile-image' />

 //     <form className='skeleton-profile-form' />

 //     {/* Additional skeleton elements for specific fields */}
 //     <div className='skeleton-field mb-2' />
 //     <div className='skeleton-field mb-2' />
 //     <div className='skeleton-field mb-2' />
 //     <div className='skeleton-field mb-2' />
 //     <div className='skeleton-field mb-2 flex gap-x-3'>
 //      <div className='skeleton-field-half w-1/2' />
 //      <div className='skeleton-field-half w-1/2' />
 //     </div>
 //     <div className='skeleton-field mb-2' />

 //     <div className='skeleton-button'>
 //      Loading...
 //     </div>
 //    </div>
 //   </section>
 //  );
 // }


 if (status === "unauthenticated") {
  return redirect("/login");
 }


 return (
  // <section className=' mt-8'>
  //  <UserTabs isAdmin={isAdmin} />
  //  <div className=' max-w-lg mx-auto mt-8'>
  //   <div className=' flex gap-4 '>
  //    <div className=' flex flex-col'>
  //     <EditableImage link={image} setLink={setImage} />
  //    </div>
  //    <form onSubmit={handelProfileUpdate} className='max-w-md mx-auto bg-white/10  dark:bg-black/10 shadow-2xl rounded px-8 pt-6 pb-8 mb-4'>
  //     <div className='mb-2'>
  //      <label htmlFor="name" >Name and Last Name</label>
  //      <input id="name" name="name" value={userName} onChange={e => setUserName(e.target.value)} type='text' placeholder='First and Last name' />
  //     </div>
  //     <div className='mb-2'>
  //      <label htmlFor="email" >Email</label>
  //      <input id="email" name="email" disabled={true} type='email' value={session.data.user.email} />
  //     </div>
  //     <div className='mb-2'>
  //      <label htmlFor="phone" >Phone</label>
  //      <input id="phone" name="phone" type='tel' value={phone} onChange={e => setPhone(e.target.value)} placeholder='Phone number' />
  //     </div>
  //     <div className='mb-2'>
  //      <label htmlFor="streetAddress" >Street Address</label>
  //      <input id="streetAddress" type='text' value={streetAddress} onChange={e => setStreetAddress(e.target.value)} placeholder='Street address' />
  //     </div>
  //     <div className='mb-2 flex gap-x-3'>
  //      <div className='w-1/2'>
  //       <label htmlFor="postalCode" >Postal Code</label>
  //       <input id="postalCode" type='text' value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder='Postal code' />
  //      </div>
  //      <div className='w-1/2'>
  //       <label htmlFor="city" >City</label>
  //       <input id="city" type='text' value={city} onChange={e => setCity(e.target.value)} placeholder='City' />
  //      </div>
  //     </div>
  //     <div className='mb-2'>
  //      <label htmlFor="country" >Country</label>
  //      <input id="country" type='text' value={country} onChange={e => setCountry(e.target.value)} placeholder='Country' />
  //     </div>
  //     <button type='submit'>
  //      Save
  //     </button>
  //    </form>
  //   </div>
  //  </div>
  // </section>
  <section className='mt-8'>
   {/* User Tabs (skeleton) */}
   {status === 'loading' || !profileFetched ? (
    <Skeleton count={3} width={150} height={30} />
   ) : (
    <UserTabs isAdmin={isAdmin} />
   )}

   {/* Profile details (skeleton) */}
   <div className='max-w-xl mx-auto mt-8'>
    {status === 'loading' || !profileFetched ? (
     <div>
      <p>loading</p>
      <Skeleton circle={true} height={100} width={100} />
      <SkeletonLine count={4} height={40} />
      <SkeletonLine height={40} />
      <SkeletonLine height={40} />
      <SkeletonLine height={40} />
      <div className='flex gap-x-3'>
       <SkeletonLine height={40} width={150} />
       <SkeletonLine height={40} width={150} />
      </div>
      <SkeletonLine height={40} />
      <SkeletonLine height={40} />
     </div>
    ) : (
     <>
      <UserForm user={user} onSave={handelProfileUpdate} />
     </>
    )}
   </div>
  </section>
 );
};

export default page;
