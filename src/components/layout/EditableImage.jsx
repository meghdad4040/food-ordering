import Image from "next/image";
import toast from "react-hot-toast";

const EditableImage = ({ link, setLink }) => {

 const handleImageChange = async e => {
  const files = e.target.files;
  if (files?.length === 1) {
   const data = new FormData();
   data.set("file", files[0]);
   const uploadPromise = new Promise(async (resolve, reject) => {
    const response = await fetch("/api/upload", {
     method: "POST",
     body: data
    })
    if (response.ok) {
     const link = await response.json()
     console.log(link)
     setLink(link)
     resolve()
    } else {
     reject()
    }
   })
   await toast.promise(uploadPromise, {
    loading: "uploading ...",
    success: "upload image 👌",
    error: "error in upload 🤯",
   });
  }
 }

 return (
  <>
   <div className='p-2 rounded-lg w-[7rem] h-[7rem]'>
    {link && (<Image
     className=' rounded-lg w-full h-full mb-1'
     src={link}
     width={125}
     height={125}
     alt='avatar'
     priority={true}
    />)}
    {!link && (
     <div className=" flex items-center justify-center bg-gray-200 dark:bg-slate-500 rounded-lg w-full h-full text-gray-800 my-2">
      No image
     </div>
    )}
    <label className="">
     <input onChange={handleImageChange} type='file' className=' hidden' />
     <div className='flex btn btn-outline btn-xs'>Edit</div>
    </label>
   </div>
  </>
 )
}

export default EditableImage;