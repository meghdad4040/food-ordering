import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "../layout/SectionHeaders";

const HomeMenu = () => {
  return (
    <section>
      <div className='absolute right-0  w-full'>
        <div className=' absolute left-0 -top-[70px] text-left -z-10'>
          <Image
            className='w-auto h-auto'
            width={109}
            height={189}
            src={"/sallad1.png"}
            alt={"sallad"}
          />
        </div>
        <div className=' absolute -top-[100px] right-0 -z-10 '>
          <Image
            className='w-auto h-auto'
            width={109}
            height={189}
            src={"/sallad2.png"}
            alt={"sallad"}
          />
        </div>
      </div>
      <div className=' text-center mb-4 mt-8'>
        <SectionHeaders
          subHeader={"Check Out"}
          mainHeader={"Menu"}
        />
      </div>
      <div className=' grid grid-cols-1 tablet:grid-cols-3 gap-8 tablet:gap-4'>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
};

export default HomeMenu;
