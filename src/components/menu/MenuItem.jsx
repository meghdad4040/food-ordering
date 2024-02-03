const MenuItem = () => {
  return (
    <div className=' bg-gray-200/25 dark:bg-gray-500/25 p-4 rounded-lg text-center hover:bg-white hover:shadow-black/25 shadow-xl transition-all hover:-translate-y-2'>
      <div className=' text-center'>
        <img
          className='max-h-24 block mx-auto'
          src='/pizza-3.png'
          alt='pizza'
        />
      </div>
      <h4 className='text-gray-800 font-semibold text-xl my-3'>Pepperoni Pizza</h4>
      <p className=' text-gray-500 text-sm'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
      <button className='btn btn-sm w-2/3 btn-outline my-4 border-none bg-best dark:bg-darkBest text-white '>
        Add to cart $12
      </button>
    </div>
  );
};

export default MenuItem;
