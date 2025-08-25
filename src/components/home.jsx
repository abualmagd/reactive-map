import FilterSection from "./filterSection";
import ReactiveMap from "./reactiveMap";

//const ReactiveMap = React.lazy(() => import("./reactiveMap"));

export default function Home() {
  return (
    <div className=" md:h-screen   w-full lg:overflow-y-hidden  flex-1 flex flex-col  items-center text-white">
      <div className="  w-full md:h-full  flex md:flex-row flex-col-reverse  lg:items-start items-center  flex-1">
        <FilterSection />
        <ReactiveMap />
      </div>
    </div>
  );
}
