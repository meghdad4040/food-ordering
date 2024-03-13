import Image from "next/image";

const MenuItem = ({
  image, name, description, basePrice,
  sizes, extraIngredientPrices, category
}) => {
  return (
    <div className='rounded-ss-2xl min-w-[12rem] max-w-[15rem] xl:min-w-[13.5rem] xl:max-w-[17rem]  rounded-br-2xl bg-gray-200/25 dark:bg-gray-500/25 p-4  text-center hover:bg-white hover:shadow-black/25 shadow-xl transition-all hover:-translate-y-2'>
      <div className=' text-center'>
        <Image
          className=' w-32 h-32 mx-auto shadow-2xl rounded-ss-2xl rounded-br-2xl'
          src={image}
          width={100}
          height={100}
          alt='pizza'
        />
      </div>
      <h4 className='text-gray-800 dark:text-gray-300 font-semibold text-xl my-3'>{name}</h4>
      <p className=' text-gray-500 dark:text-gray-400 text-sm line-clamp-3 '>
        {description}
      </p>
      <button className='btn !px-10 btn-sm w-2/3 btn-outline my-4 border-none bg-best dark:bg-darkBest text-white '>
        Add&nbsp;to&nbsp;cart&nbsp;${basePrice}
      </button>
    </div>
  );
};

export default MenuItem;
