import { Link } from "react-router";
import DataSection from "./dataSection";
import FilterSection from "./filterSection";
import PartsMap from "./partsMap";
import ReactiveMap from "./reactiveMap";

export default function Home() {
  return (
    <div className=" w-full h-full flex-1 flex flex-col  items-center text-white">
      <p className=" px-3 py-2 rounded-xl bg-blue-200/20 my-3 text-xl font-bold w-fit text-white">
        خريطة المدارس – منطقة الرياض{" "}
      </p>
      <div className="h-5"></div>
      <div className="  w-full h-full flex lg:flex-row flex-col-reverse  lg:items-start items-center gap-4 flex-1">
        <FilterSection />
        <ReactiveMap />
      </div>
      <div className=" w-full h-20 flex items-end  justify-items-end">
        <Link to={"/admin"} className=" mr-auto border rounded px-2 py-1">
          التحكم
        </Link>
      </div>
    </div>
  );
}
