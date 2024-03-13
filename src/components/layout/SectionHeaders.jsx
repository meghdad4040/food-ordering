const SectionHeaders = ({ subHeader, mainHeader }) => {
  return (
    <>
      <h3 className=' uppercase text-gray-500 text-sm sm:text-base font-semibold leading-4'>
        {subHeader}
      </h3>
      <h2 className=' text-best dark:text-darkBest font-bold text-2xl sm:text-4xl italic'>
        {mainHeader}
      </h2>
    </>
  );
};

export default SectionHeaders;
