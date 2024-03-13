"use client"

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "../layout/SectionHeaders";
import { useEffect, useState } from "react";
import axios from "axios";

const HomeMenu = () => {

 const [bestSellers, setBestSellers] = useState([])

 useEffect(() => {
  axios("/api/menu-items").then(res => {
   const menuItems = res.data
   setBestSellers(menuItems.slice(-4))
  })
 }, [])

 return (
  <section>
   <div className='absolute right-0  w-full'>
    <div className=' absolute left-0 -top-[70px] text-left -z-10'>
     <Image
      className='w-auto h-auto'
      width={109}
      height={189}
      src={"/sallad1.png"}
      alt={"sallad"}
     />
    </div>
    <div className=' absolute -top-[100px] right-0 -z-10 '>
     <Image
      className='w-auto h-auto'
      width={109}
      height={189}
      src={"/sallad2.png"}
      alt={"sallad"}
     />
    </div>
   </div>
   <div className=' text-center mb-4 mt-8'>
    <SectionHeaders
     subHeader={"Check Out"}
     mainHeader={"Our Best Sellers"}
    />
   </div>
   <div className=' grid justify-items-center  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-12'>
    {bestSellers.length > 0 && bestSellers.map(item => (
     <MenuItem key={item._id} {...item} />
    ))}
   </div>
  </section>
 );
};

export default HomeMenu;
