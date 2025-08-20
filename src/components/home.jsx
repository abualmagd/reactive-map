import DataSection from "./dataSection";
import SectorsMap from "./sectorMap";

export default function Home() {
  return (
    <div className=" w-full h-full flex-1 flex flex-col  items-center text-white">
      <p className=" px-3 py-2 rounded-xl bg-blue-200/20 my-3 text-xl font-bold w-fit text-white">
        خريطة التجمعات الصحية بالرياض
      </p>
      <div className="h-5"></div>
      <div className="  w-full h-full flex md:flex-row flex-col flex-1">
        <DataSection />
        <SectorsMap />
      </div>
    </div>
  );
}
