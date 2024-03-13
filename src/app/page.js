import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <section className=' container max-w-3xl xl:max-w-5xl'>
      <Hero />
      <HomeMenu />
      <section id="about" className=' text-center my-10'>
        <SectionHeaders
          subHeader={"Our Story"}
          mainHeader={"About us"}
        />
        <div className=' text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt quos
            autem minus, reprehenderit suscipit modi, nisi voluptatem minima dicta
            eligendi laudantium delectus. Nulla reprehenderit rem sint eveniet in.
            Praesentium, iure.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt quos
            autem minus, reprehenderit suscipit modi, nisi voluptatem minima dicta
            eligendi laudantium delectus. Nulla reprehenderit rem sint eveniet in.
            Praesentium, iure.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt quos
            autem minus, reprehenderit suscipit modi, nisi voluptatem minima dicta
            eligendi laudantium delectus. Nulla reprehenderit rem sint eveniet in.
            Praesentium, iure.
          </p>
        </div>
      </section>
      <section id="contact" className=' text-center my-10'>
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className=' mt-8'>
          <a
            className=' text-4xl underline underline-offset-1 text-gray-500'
            href='tel:+989355480436'>
            +98 935 548 0 436
          </a>
        </div>
      </section>
    </section>
  );
}
