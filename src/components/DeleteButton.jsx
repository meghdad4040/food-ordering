import { useState } from "react";

const DeleteButton = ({ label, onDelete, className }) => {

 const [showConfirm, setShowConfirm] = useState(false)

 if (showConfirm) {
  return (
   <div className=" fixed bg-black/80 inset-0 flex items-center h-full justify-center">
    <div className=" bg-gray-300 text-black dark:bg-gray-700 dark:text-gray-300 p-4 rounded-lg">
     <div className="">Are you sure you want to delete?</div>
     <div className=" flex gap-2 mt-4 justify-center">
      <button
       className=" btn btn-sm btn-success"
       type="button"
       onClick={() => setShowConfirm(false)}>
       Cancel
      </button>
      <button
       className=" btn btn-sm btn-error"
       type="button"
       onClick={onDelete}>
       Yes, delete
      </button>
     </div>
    </div>
   </div>


  )
 }

 return (
  <button className={className} type="button" onClick={() => setShowConfirm(true)}>
   {label}
  </button>
 );
}

export default DeleteButton;