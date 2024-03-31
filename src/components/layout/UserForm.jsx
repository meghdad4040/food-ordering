"use client";

import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../useProfile";
import AddressInputs from "./AddressInputs";

const UserForm = ({ user, onSave }) => {

 const [userName, setUserName] = useState(user?.name || "");
 const [image, setImage] = useState(user?.image || "");
 const [phone, setPhone] = useState(user?.phone || "");
 const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
 const [postalCode, setPostalCode] = useState(user?.postalCode || "");
 const [city, setCity] = useState(user?.city || "");
 const [country, setCountry] = useState(user?.country || "");
 const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
 const { data: loggedInUserData } = useProfile()

 const handleAddressChange = (propName, value) => {
  if (propName === "phone") setPhone(value)
  if (propName === "streetAddress") setStreetAddress(value)
  if (propName === "postalCode") setPostalCode(value)
  if (propName === "city") setCity(value)
  if (propName === "country") setCountry(value)
 }

 return (
  <div className='flex gap-4'>
   <EditableImage link={image} setLink={setImage} />
   <form onSubmit={e => onSave(e, { name: userName, image, streetAddress, phone, city, country, postalCode, isAdmin })}
    className='max-w-md mx-auto bg-white/10  dark:bg-black/10 shadow-2xl rounded px-8 pt-6 pb-8 mb-4'>
    <div className='mb-2'>
     <label htmlFor="name" >Name and Last Name</label>
     <input id="name" name="name" value={userName}
      onChange={e => setUserName(e.target.value)}
      type='text' placeholder='First and Last name' />
    </div>
    <div className='mb-2'>
     <label htmlFor="email" >Email</label>
     <input id="email" name="email" disabled={true}
      type='email' value={user.email} />
    </div>
    <AddressInputs
     addressProps={{ streetAddress, phone, city, country, postalCode }}
     setAddressProps={handleAddressChange} />
    {loggedInUserData.isAdmin && (
     <div className=" ms-2 flex items-center gap-2 mb-2">
      <input value={"1"} defaultChecked={isAdmin}
       onClick={e => setIsAdmin(e.target.checked)}
       className=" checkbox-xs checkbox checkbox-primary"
       type="checkbox" name="adminCb" id="adminCb" />
      <label htmlFor="adminCb">Admin</label>
     </div>
    )}
    <button type='submit'>Save</button>
   </form>
  </div>
 );
}

export default UserForm;