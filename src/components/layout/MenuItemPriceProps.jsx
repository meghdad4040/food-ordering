import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { TiArrowUpOutline } from "react-icons/ti";
import { TiArrowDownOutline } from "react-icons/ti";

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {

  const [isOpen, setIsOpen] = useState(false)

  const addProp = () => {
    setProps(oldProps => {
      return [...oldProps, { name: "", price: 0 }]
    })
  }

  const editProp = (e, index, prop) => {
    const newValue = e.target.value
    setProps(prevSize => {
      const newSizes = [...prevSize]
      newSizes[index][prop] = newValue
      return newSizes
    })
  }

  const removeProp = (indexToRemove) => {
    setProps(prev => prev.filter((v, index) => index !== indexToRemove))
  }


  return (
    <div className={`flex flex-col gap-2 bg-gray-200 dark:bg-slate-500 p-2 rounded-xl my-4 transition duration-500 `}>
      <button type="button" onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex p-1 justify-start items-center transition duration-300">
        {isOpen && (<TiArrowUpOutline className="active:rotate-180 transition-transform duration-1000 ease-in-out " />)}
        {!isOpen && (<TiArrowDownOutline className="active:rotate-180 transition-transform duration-1000 ease-in-out" />)}
        <span className=" text-sm">{name}</span>
        <span className=" text-sm">({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 && props.map((size, index) => (
          <div key={index} className=" flex items-end gap-4">
            <div className="*:text-xs">
              <label className=" dark:text-gray-800">Size name</label>
              <input
                className=" mt-1 h-7 ring-4 ring-violet-400 dark:ring-orange-300"
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={e => editProp(e, index, "name")} />
            </div>
            <div className="*:text-xs">
              <label className=" dark:text-gray-800">Extra price</label>
              <input
                className=" mt-1 h-7 ring-4 ring-violet-400 dark:ring-orange-300"
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={e => editProp(e, index, "price")} />
            </div>
            <div>
              <button onClick={() => removeProp(index)}
                type="button"
                className=" bg-white hover:bg-gray-300 hover:text-gray-500 mb-2 text-xs p-2 rounded-lg font-bold dark:bg-slate-400 dark:text-gray-700 dark:hover:bg-slate-700 dark:hover:text-gray-400 transition duration-300 ease-in-out">
                <FaTrashAlt className=" hover:scale-150" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProp}
          className=" w-full mx-auto flex items-center justify-center gap-1 bg-white dark:hover:bg-orange-300 px-3 rounded-lg text-sm font-bold py-1 ">
          <IoMdAddCircle /> <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}

export default MenuItemPriceProps;