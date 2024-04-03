import Image from "next/image";
import AddToCartButton from "./AddToCartButton";


const MenuItemTile = ({ onAddToCart, ...item }) => {
 const { image, name, description, basePrice, sizes, extraIngredientPrices } = item
 const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0

 return (
  <div className='rounded-ss-2xl min-w-[12rem] max-w-[15rem] xl:min-w-[13.5rem] xl:max-w-[17rem]  rounded-br-2xl bg-slate-300/25 dark:bg-slate-950/25 p-4  text-center hover:shadow-black/25 shadow-xl transition-all hover:-translate-y-2'>
   <div className=' text-center'>
    <Image
     className=' w-32 h-32 mx-auto  rounded-ss-2xl rounded-br-2xl'
     src={image}
     width={100}
     height={100}
     alt='pizza'
    />
   </div>
   <h4 className='text-gray-800 dark:text-gray-300 font-semibold text-lg my-3'>{name}</h4>
   <p className=' text-gray-500 dark:text-gray-400 text-xs line-clamp-3 '>
    {description}
   </p>
   <AddToCartButton onClick={onAddToCart} hasSizesOrExtras={hasSizesOrExtras} basePrice={basePrice} />
  </div>
 );

}

export default MenuItemTile;