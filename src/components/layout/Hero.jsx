import Image from "next/image";
import { TiArrowRightOutline } from "react-icons/ti";

const Hero = () => {
  return (
    <section className='grid grid-cols-1 tablet:grid-cols-2 mt-4'>
      <div className='text-center tablet:text-start order-2 tablet:order-1 tablet:py-12'>
        <h1 className='text-black dark:text-gray-300 text-4xl font-semibold'>
          Everything
          <br /> is better
          <br /> with a&nbsp;
          <span className=' text-best dark:text-darkBest'>Pizza</span>
        </h1>
        <p className=' my-6 text-gray-500 dark:text-gray-400 text-sm'>
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className=' *:text-xs flex items-center gap-4 '>
          <button className='bg-best dark:bg-darkBest uppercase text-white btn btn-outline btn-sm dark:border-0'>
            order now
            <TiArrowRightOutline />
          </button>
          <button className=' text-gray-700 whitespace-nowrap dark:text-gray-400 flex items-center gap-2 font-semibold'>
            learn more
            <TiArrowRightOutline />
          </button>
        </div>
      </div>
      <div className=' order-1 tablet:order-2 relative'>
        <Image
          src={"/pizza-2.png"}
          priority={false}
          width={500}
          height={500}
          className=' tablet:fill-transparent tablet:object-fill '
          alt='pizza'
        />
      </div>
    </section>
  );
};

export default Hero;
