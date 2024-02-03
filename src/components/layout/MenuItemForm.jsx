"use client"

import { useEffect, useState } from "react"
import EditableImage from "./EditableImage"
import MenuItemPriceProps from "./MenuItemPriceProps";
import DeleteButton from "../DeleteButton";
import axios from "axios";

const MenuItemForm = ({ onSubmit, onDelete, menuItem }) => {

 const [image, setImage] = useState(menuItem?.image || "")
 const [name, setName] = useState(menuItem?.name || "")
 const [description, setDescription] = useState(menuItem?.description || "")
 const [basePrise, setBasePrise] = useState(menuItem?.basePrise || "")
 const [sizes, setSizes] = useState(menuItem?.sizes || [])
 const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || [])
 const [categories, setCategories] = useState([])
 const [category, setCategory] = useState(menuItem?.category || "")


 const fetchCategories = async () => {
  await axios("/api/categories").then(res => {
   setCategories(res.data)
  })
 }

 useEffect(() => {
  fetchCategories()
 }, []);


 return (
  <>
   <div className="flex gap-4 max-w-xl mx-auto mt-8">
    <div className="">
     <EditableImage link={image} setLink={setImage} />
    </div>
    <div className="grow">
     <form onSubmit={(e) => onSubmit(e, { name, image, description, basePrise, sizes, extraIngredientPrices, category })}
      className="bg-white/10  dark:bg-black/10 shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
      <label htmlFor="name">Item name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" />
      <label htmlFor="des">Description</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} id="des" type="text" />
      <label htmlFor="category">category</label>
      <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
       {categories?.length > 0 && categories.map(c => (
        <option key={c._id} value={c._id}>{c.name}</option>
       ))}
      </select>
      <label htmlFor="prise">Base price</label>
      <input value={basePrise} onChange={(e) => setBasePrise(e.target.value)} id="prise" type="text" />
      <MenuItemPriceProps name={"Sizes"}
       addLabel={"Add item size"}
       props={sizes}
       setProps={setSizes} />
      <MenuItemPriceProps name={"Extra ingredients"}
       addLabel={"Add ingredients prices"}
       props={extraIngredientPrices}
       setProps={setExtraIngredientPrices} />
      <button type="submit">Save</button>
      {menuItem && (
       <DeleteButton className={"delete"} label={"Delete"} onDelete={onDelete} />
      )}
     </form>
    </div>
   </div>
  </>
 );
}

export default MenuItemForm;