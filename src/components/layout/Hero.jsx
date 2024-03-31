import Image from "next/image";
import { TiArrowRightOutline } from "react-icons/ti";

const Hero = () => {
 return (
  <section className='grid grid-cols-1 tablet:grid-cols-2 mt-4'>
   <div className='text-center tablet:text-start order-2 tablet:order-1 tablet:py-12'>
    <h1 className='text-black dark:text-gray-300 sm:text-4xl font-semibold'>
     Everything
     <br /> is better
     <br /> with a&nbsp;
     <span className=' text-best dark:text-darkBest'>Pizza</span>
    </h1>
    <p className=' my-6 text-gray-500 dark:text-gray-400 text-xs sm:text-sm'>
     Pizza is the missing piece that makes every day complete, a simple yet
     delicious joy in life
    </p>
    <div className='sm:*:text-xs flex items-center gap-4 '>
     <button className="uppercase relative inline-flex items-center justify-start overflow-hidden  transition-all   rounded group py-1.5 px-2.5">
      <span className="w-56 h-48 rounded bg-best dark:bg-darkBest absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span className="relative font-semibold text-[0.7rem] flex items-center gap-2 w-full text-left text-best dark:text-darkBest transition-colors duration-300 ease-in-out group-hover:text-white">
       order now
       <TiArrowRightOutline className="w-4 h-4" />
      </span>
     </button>
     <button className='text-gray-700 whitespace-nowrap dark:text-gray-400 flex text-[0.6rem] items-center gap-2 font-semibold'>
      learn more
      <TiArrowRightOutline />
     </button>
    </div>
   </div>
   <div className='order-1 tablet:order-2 relative tablet:py-12'>
    <Image
     src={"/pizza-2.png"}
     priority={false}
     width={370}
     height={370}
     className='mx-auto tablet:fill-transparent tablet:object-fill '
     alt='pizza'
    />
   </div>
  </section>
 );
};

export default Hero;
