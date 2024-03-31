"use client"

import { CartContext, cartProductPrice } from "@/components/context/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useProfile } from "@/components/useProfile";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";



const page = () => {
 const { cartProducts, removeCartProduct } = useContext(CartContext)
 const [address, setAddress] = useState({})
 const { data } = useProfile()

 useEffect(() => {
  if (data.city) {
   const { streetAddress, phone, city, country, postalCode } = data
   const addressFormData = { streetAddress, phone, city, country, postalCode }
   setAddress(addressFormData)
  }
 }, [data]);

 let total = 0
 for (const p of cartProducts) {
  total += cartProductPrice(p)
 }

 const handleAddressChange = (propName, value) => {
  setAddress(prevAddress => ({ ...prevAddress, [propName]: value }))
 }


 return (
  <section className="mt-8">
   <div className="text-center">
    <SectionHeaders mainHeader="Cart" />
   </div>
   <div className=" md:mt-4 gap-4 grid grid-cols-1 md:grid-cols-2">
    <div>
     {cartProducts?.length === 0 && (<div>No products in your shopping cart</div>)}
     {cartProducts.length > 0 && cartProducts.map((product, index) => (
      <div key={index} className="flex items-center gap-4 mb-2 border-gray-400 border-b py-2">
       <Image className=" min-w-16 min-h-16 w-24 h-24" src={product.image} width={100} height={100} alt={product.name} />
       <div className="grow text-gray-700 dark:text-gray-300">
        <h3 className="text-xs md:text-base font-semibold">{product.name}</h3>
        {product.size && (
         <div className=" text-[0.6rem] md:text-sm">
          Size: <span>{product.size.name}</span>
         </div>
        )}
        {product.extra?.length > 0 && (
         <div className="text-[0.6rem] md:text-sm text-gray-500">
          {product.extra.map(extra => (
           <div key={extra.name}>{extra.name} ${extra.price}</div>
          ))}
         </div>
        )}
       </div>
       <div className=" text-gray-600 dark:text-gray-400 text-xs md:text-lg font-semibold">
        ${cartProductPrice(product)}
       </div>
       <button type="button" className="text-gray-600 dark:text-gray-400 constant-tilt-shake" onClick={() => removeCartProduct(index)}>
        <FaTrashAlt />
       </button>
      </div>
     ))}
     <div className=" mt-4 dark:text-gray-400 text-right mr-8">
      total: <span className=" dark:text-gray-200 font-semibold">$ {total}</span>
     </div>
    </div>
    <div className=" p-4 rounded-lg mx-auto self-center bg-black/25">
     <h2 className=" text-gray-700 dark:text-gray-300 text-center font-black md:text-2xl">Checkout</h2>
     <form >
      <AddressInputs addressProps={address} setAddressProps={handleAddressChange} />
      <button type="submit">Pay ${total}</button>
     </form>
    </div>
   </div>
  </section>
 );
}

export default page;