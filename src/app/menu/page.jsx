"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from "@/components/menu/MenuItem";

const page = () => {

  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])

  const fetchCategories = async () => {
    await axios("/api/categories").then(res => {
      setCategories(res.data)
    })
  }

  const fetchMenuItems = async () => {
    await axios("/api/menu-items").then(res => {
      setMenuItems(res.data)
    })
  }

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);


  return (
    <section className="container max-w-3xl xl:max-w-5xl mt-8">
      {categories.length > 0 && categories.map(c => (
        <div key={c._id} className="">
          <div className=" text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="mt-4 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8 xl:gap-12">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default page;