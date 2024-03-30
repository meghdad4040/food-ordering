"use client"

import { useContext, useState } from "react";
import { CartContext } from "../context/AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

const MenuItem = (menuItem) => {
 const [showPopup, setShowPopup] = useState(false)
 const {
  image, name, description, basePrice,
  sizes, extraIngredientPrices, category
 } = menuItem;
 const { addToCart } = useContext(CartContext)
 const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
 const [selectedExtras, setSelectedExtras] = useState([])

 const handleExtraThing = (e, extraThing) => {
  const checked = e.target.checked
  if (checked) {
   setSelectedExtras(prev => [...prev, extraThing])
  } else {
   setSelectedExtras(prev => {
    return prev.filter(e => e.name !== extraThing.name)
   })
  }
 }

 const handelAddToCartButton = () => {
  const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0

  if (hasOptions && !showPopup) {
   setShowPopup(true)
   return
  }
  addToCart(menuItem, selectedSize, selectedExtras)
  setShowPopup(false)
  toast.success("Added to cart!")
 }

 let selectedPrice = basePrice

 if (selectedSize) {
  selectedPrice += selectedSize.price
 }
 if (selectedExtras) {
  for (const extra of selectedExtras) {
   selectedPrice += extra.price
  }
 }

 return (
  <>
   {showPopup && (
    <div onClick={() => setShowPopup(false)} className=" fixed inset-0 bg-black/80 flex items-center justify-center">
     <div onClick={e => e.stopPropagation()} className=" relative *:text-[0.6rem] flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg max-w-[15rem] md:max-w-sm max-h-[22rem] md:max-h-[25rem] ">
      <Image src={image} alt={name} width={100} height={100} className=" w-16 h-16 md:w-18 md:h-18  mx-auto" />
      <h2 className=" md:text-base text-gray-700 dark:text-gray-400 font-bold text-center my-2">{name}</h2>
      <p className=" text-center text-gray-500 md:text-sm line-clamp-2">{description}</p>
      {sizes?.length > 0 && (
       <div className=" *:text-[0.6rem] md:*:text-[0.8rem] p-2">
        <h3 className=" text-center text-gray-700 dark:text-gray-400">Pick your size</h3>
        {sizes.map(size => (
         <label key={size._id} className=" flex items-center gap-2 rounded-md mb-1">
          <input type="radio"
           name="size"
           className=" radio radio-success w-[0.7rem] h-[0.7rem] md:radio-xs"
           onClick={() => setSelectedSize(size)}
           checked={selectedSize?.name === size.name} />
          {size.name} ${basePrice + size.price}
         </label>
        ))}
       </div>
      )}
      {extraIngredientPrices.length > 0 && (
       <div className="*:text-[0.6rem] md:*:text-[0.8rem] p-2">
        <h3 className=" text-center text-gray-700 dark:text-gray-400">Pick your size</h3>
        {extraIngredientPrices.map(extraThing => (
         <label key={extraThing._id} className=" flex items-center gap-2 rounded-md mb-1">
          <input type="checkbox"
           name="extraThing"
           className=" checkbox w-[0.7rem] h-[0.7rem]  md:checkbox-xs checkbox-success"
           onClick={e => handleExtraThing(e, extraThing)} />
          {extraThing.name} +${extraThing.price}
         </label>
        ))}
       </div>
      )}
      <button
       onClick={handelAddToCartButton}
       className=" btn btn-xs submit">
       Add to cart ${selectedPrice}
      </button>
      <button onClick={() => setShowPopup(false)} className=" absolute top-2">X</button>
     </div>
    </div>
   )}
   <MenuItemTile onAddToCart={handelAddToCartButton} {...menuItem} />
  </>
 );
};

export default MenuItem;
