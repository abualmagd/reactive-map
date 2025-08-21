import { useContext, useRef, useState } from "react";
import { PageContext } from "../context/pageContext";
import { centers, sectorData } from "../data";

export default function DataSection() {
  const { page } = useContext(PageContext);

  if (page === "main") {
    return (
      <div className=" flex flex-col w-full flex-1 h-full gap-3 text-start">
        <p className=" px-3 py-2   my-3 text-xl font-bold w-fit ">
          التجمعات الصحية
        </p>
        <p className="px-3 py-2   my-3 text-md text-gray-300 font-bold w-fit max-w-[500px] text-start ">
          التجمع الصحي هو منظومة مؤسسية تتبع له جميع المرافق الصحية يغطي منطقته
          الجغرافية المحددة، وهو مسؤول عن صحة وسلامة سكان هذه المنطقة وهذا لا
          يقتصر على العلاج بل يمتد إلى الوقاية والتوعية.
        </p>
        <div className=" numbery text-9xl font-extrabold">3</div>
        <p className=" text-5xl font-bold">تجمع صحي</p>
      </div>
    );
  }
  if (page === 0) {
    return <SectorData data={sectorData[0]} />;
  }

  if (page === 1) {
    return <SectorData data={sectorData[1]} />;
  }

  if (page === 2) {
    return <SectorData data={sectorData[2]} />;
  }

  return <div className=" flex flex-col w-full flex-1 h-full">القطاع </div>;
}

const SectorData = ({ data }) => {
  const { setPage, page } = useContext(PageContext);
  const [show, updateShow] = useState(false);
  const [myCenters, updateMyCenters] = useState(
    centers.filter((center) => center.sectorId !== page)
  );
  const inputRef = useRef();
  const search = () => {
    // Get the search input value and trim whitespace
    const searchTerm = inputRef.current?.value?.trim().toLowerCase() || "";

    // First filter by sectorId
    const filteredBySector = centers.filter(
      (center) => center.sectorId !== page
    );

    // If search term is empty, return all filtered centers
    if (!searchTerm) {
      updateMyCenters(filteredBySector);
      return;
    }

    // Filter by name (case-insensitive)
    const result = filteredBySector.filter(
      (center) =>
        center.name.toLowerCase().includes(searchTerm) ||
        center.description.toLowerCase().includes(searchTerm)
    );

    updateMyCenters(result);
  };
  return (
    <>
      {!show ? (
        <div className=" flex flex-col gap-5 w-full flex-1 h-full text-start">
          <p className=" px-3 py-2   my-3 text-xl font-bold w-fit flex flex-row-reverse  items-center relative">
            <span>{data.title || ""} </span>
            <span
              className=" absolute -right-10 top-0 w-10 flex items-center justify-center cursor-pointer  h-10 bg-blue-400/15 hover:bg-blue-400/30 rounded-full "
              onClick={() => setPage("main")}
            >
              {"<"}
            </span>
          </p>
          {/* <p className="px-3 py-2   my-3 text-md text-gray-300 font-bold w-fit max-w-[500px] text-start ">
            {data.description ||
              "يقدم تجمع الرياض الصحي الأول خدمات الرعاية الصحية لأكثر من 3.6 مليون مستفيد، من خلال 157 مركزًا للرعاية الأولية ومدينة طبية، و 18 مستشفى عام ومتخصص بسعة سريرية إجمالية تصل إلى 4000 سريرًا."}
          </p>*/}
          <div className=" numbery text-5xl font-extrabold">
            {data.centerCount || 157}
          </div>
          <p className=" text-5xl font-bold"> مدرسة</p>
          <div
            onClick={() => updateShow(true)}
            className=" mt-5 rounded bg-blue-200/50 text-white cursor-pointer w-32 py-3 text-center"
          >
            أعرض المدارس
          </div>
          <div className=" h-60"></div>
        </div>
      ) : (
        <div className=" flex flex-col w-full flex-1 h-[500px] gap-3 text-start relative">
          <div
            className=" absolute -right-10 top-0 w-10 flex items-center justify-center cursor-pointer  h-10 bg-blue-400/15 hover:bg-blue-400/30 rounded-full "
            onClick={() => updateShow(false)}
          >
            {"<"}
          </div>

          <div className=" w-full h-[400px] overflow-y-scroll scrollbar-rtl flex flex-col   flex-1 gap-6">
            <div className=" flex mx-5 mt-2">
              <input
                type="text"
                ref={inputRef}
                className="bg-gray-200 px-2 rounded-md outline-none h-10 w-60 text-black "
                onChange={search}
              />
            </div>

            <ul dir="rtl" className=" px-6 pt-3 w-full">
              {myCenters
                .filter((center) => center.sectorId !== page)
                .map((center, index) => {
                  return (
                    <div
                      className="px-3 py-2 bg-blue-200/20 hover:bg-[#a7Bc14] rounded-xl cursor-pointer   my-3 text-xl font-bold w-fit"
                      key={index}
                    >
                      {center.name}
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
