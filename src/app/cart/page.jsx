"use client"

import { CartContext, cartProductPrice } from "@/components/context/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";



const page = () => {
 const { cartProducts } = useContext(CartContext)


 return (
  <section className=" mt-8">
   <div className=" text-center">
    <SectionHeaders mainHeader="Cart" />
   </div>
   <div className=" mt-4 grid grid-cols-2">
    <div>
     {cartProducts?.length === 0 && (
      <div>No products in your shopping cart</div>
     )}
     {cartProducts.length > 0 && cartProducts.map(product => (
      <div key={product._id} className="flex items-center gap-4 mb-2 border-b py-2">
       <div className=" w-24">
        <Image className=" w-24" src={product.image} width={100} height={100} alt={product.name} />
       </div>
       <div className=" grow">
        <h3 className=" font-semibold">{product.name}</h3>
        {product.size && (
         <div className=" text-sm">
          Size: <span>{product.size.name}</span>
         </div>
        )}
        {product.extra?.length > 0 && (
         <div className=" text-sm text-gray-500">
          {product.extra.map(extra => (
           <div key={extra.name}>{extra.name} ${extra.price}</div>
          ))}
         </div>
        )}
       </div>
       <div className=" text-lg font-semibold">
        ${cartProductPrice(product)}
       </div>
       <button className="">
        <FaTrashAlt />
       </button>
      </div>
     ))}
    </div>
    <div>Right</div>
   </div>
  </section>
 );
}

export default page;