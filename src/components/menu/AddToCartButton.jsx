const AddToCartButton = ({ onClick, hasSizesOrExtras, basePrice }) => {
 return (
  <button
   onClick={onClick}
   className='btn  text-xs btn-sm w-full btn-outline my-4 border-none bg-best dark:bg-darkBest hover:bg-violet-400 dark:hover:bg-orange-400 text-white '>
   {
    (hasSizesOrExtras) ? (
     <span>Add&nbsp;to&nbsp;cart&nbsp;(from ${basePrice})</span>
    ) : (
     <span>Add&nbsp;to&nbsp;cart&nbsp;${basePrice}</span>
    )
   }
  </button>
 );
}

export default AddToCartButton;