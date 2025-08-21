import { useContext, useRef, useState } from "react";
import { SchoolContext } from "../context/school";
import { InitialContext } from "../context/initialContext";
import { exportToExcel } from "../services/excelServices";

export default function FilterSection() {
  const { schools, setSchools } = useContext(SchoolContext);
  const [sectors, updateSectors] = useState([1, 2, 3, 4]);
  const { data } = useContext(InitialContext);
  const nameRef = useRef();
  const quarterRef = useRef();
  const genderRef = useRef();
  const stageRef = useRef();
  const typeRef = useRef();

  const updateUserSectors = (id, e) => {
    if (e.target.checked) {
      const filtered = [...sectors, id];
      updateSectors((prev) => [...prev, id]);
      const filterdSchools = data.filter((schola) =>
        filtered.includes(schola.sectorId)
      );
      setSchools(filterdSchools);
    } else {
      const filtered = sectors.filter((sector) => sector !== id);
      updateSectors(filtered);
      const filterdSchools = data.filter((schola) =>
        filtered.includes(schola.sectorId)
      );
      setSchools(filterdSchools);
    }
  };

  const resetFilters = () => {
    nameRef.current.value = "";
    quarterRef.current.value = "";
    genderRef.current.value = "";
    stageRef.current.value = "";
    typeRef.current.value = "";
    setSchools(data);
  };

  const filterSchools = () => {
    const nameValue = nameRef.current?.value.trim().toLowerCase();
    const quarterValue = quarterRef.current?.value.trim().toLowerCase();
    const genderValue = genderRef.current?.value.toLowerCase();
    const stageValue = stageRef.current?.value.toLowerCase();
    const typeValue = typeRef.current?.value.toLowerCase();

    const sectoredData = data.filter((schola) =>
      sectors.includes(schola.sectorId)
    );

    let filtered = sectoredData;

    if (nameValue) {
      filtered = filtered.filter((schola) =>
        schola.name?.toLowerCase().includes(nameValue)
      );
    }

    if (quarterValue) {
      filtered = filtered.filter((schola) =>
        schola.quarter?.toLowerCase().includes(quarterValue)
      );
    }

    if (genderValue) {
      filtered = filtered.filter(
        (schola) => schola.gender?.toLowerCase() === genderValue
      );
    }

    if (stageValue) {
      filtered = filtered.filter(
        (schola) => schola.stage?.toLowerCase() === stageValue
      );
    }

    if (typeValue) {
      filtered = filtered.filter(
        (schola) => schola.type?.toLowerCase() === typeValue
      );
    }

    setSchools(filtered);
  };

  const handleExportExcel = () => {
    exportToExcel(schools);
  };
  return (
    <div className=" flex-1 flex flex-col   h-full min-h-[600px] items-start mx-2 ">
      <div className="sectors-chooser gap-3 flex flex-wrap p-2">
        <div className="choosery  flex ">
          <input
            type="checkbox"
            name="sector1"
            id="sector-1"
            checked={sectors.includes(1)}
            onChange={(e) => updateUserSectors(1, e)}
            className="peer ml-1 cursor-pointer"
          />

          <label
            htmlFor="sector-1"
            className="cursor-pointer flex bg-transparent px-2 py-1 rounded-md peer-checked:bg-[var(--blue)] font-semibold"
          >
            <span>التجمع الصحي الأول</span>{" "}
            <span className="block w-3 h-3 mx-1 mt-2 bg-[var(--first)]"></span>
          </label>
        </div>
        <div className="choosery  flex ">
          <input
            type="checkbox"
            name="sector2"
            id="sector-2"
            checked={sectors.includes(2)}
            onChange={(e) => updateUserSectors(2, e)}
            className="peer ml-1 cursor-pointer"
          />

          <label
            htmlFor="sector-2"
            className="cursor-pointer flex bg-transparent px-2 py-1 rounded-md peer-checked:bg-[var(--blue)] font-semibold"
          >
            <span>التجمع الصحي الثاني</span>{" "}
            <span className="block w-3 h-3 mx-1 mt-2 rounded bg-[var(--second)]"></span>
          </label>
        </div>
        <div className="choosery  flex ">
          <input
            type="checkbox"
            name="sector3"
            id="sector-3"
            checked={sectors.includes(3)}
            onChange={(e) => updateUserSectors(3, e)}
            className="peer ml-1 cursor-pointer"
          />

          <label
            htmlFor="sector-3"
            className="cursor-pointer flex bg-transparent px-2 py-1 rounded-md peer-checked:bg-[var(--blue)] font-semibold"
          >
            <span>التجمع الصحي الثالث</span>{" "}
            <span className="block w-3 h-3 mx-1 mt-2 rounded-full bg-[var(--third)]"></span>
          </label>
        </div>

        <div className="choosery  flex ">
          <input
            type="checkbox"
            name="sector4"
            id="sector-4"
            checked={sectors.includes(4)}
            onChange={(e) => updateUserSectors(4, e)}
            className="peer ml-1 cursor-pointer"
          />

          <label
            htmlFor="sector-4"
            className="cursor-pointer flex bg-transparent px-2 py-1 rounded-md peer-checked:bg-[var(--blue)] font-semibold"
          >
            <span> لا تتبع أي تجمع</span>{" "}
            <span className="block w-3 h-3 mx-1 mt-2 rounded-b-full bg-[var(--fourth)]"></span>
          </label>
        </div>
      </div>

      {/**filtering */}
      <div className=" flex flex-col w-full gap-4 h-full mt-5">
        <div className=" flex flex-col gap-2.5 items-start w-full">
          <label htmlFor="school-name">البحث بأسم المدرسة:</label>
          <input
            type="text"
            name="school-name"
            id="school-name"
            ref={nameRef}
            placeholder=" أكتب اسم المدرسة.."
            className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
          />
        </div>

        <div className=" flex flex-col gap-2.5 items-start w-full">
          <label htmlFor="school-quarter">الحي :</label>
          <input
            type="text"
            ref={quarterRef}
            name="school-quarter"
            id="school-quarter"
            placeholder=" أكتب اسم الحي.."
            className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
          />
        </div>

        <div className=" filters-selects flex gap-5 justify-between">
          <div className=" flex flex-col gap-2.5 items-start w-full">
            <label htmlFor="school-gender">الجنس :</label>
            <select
              name="school-gender"
              ref={genderRef}
              id="school-gender"
              className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
            >
              <option value={""}>الكل </option>
              <option value={"بنين"}>بنين </option>
              <option value={"بنات"}>بنات </option>
            </select>
          </div>

          <div className=" flex flex-col gap-2.5 items-start w-full">
            <label htmlFor="school-stage">المرحلة :</label>
            <select
              name="school-stage"
              ref={stageRef}
              id="school-staege"
              className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
            >
              <option value={""}>الكل </option>
              <option value={"التعليم المستمر"}>التعليم المستمر </option>
              <option value={"المرحلة الأبتدائية"}>المرحلة الأبتدائية</option>
              <option value={"التعليم المتوسطة"}>المرحلة المتوسطة </option>
              <option value={"المرحلة الثانوية"}>المرحلة الثانوية </option>
              <option value={"رياض أطفال"}>رياض أطفال </option>
            </select>
          </div>

          <div className=" flex flex-col gap-2.5 items-start w-full">
            <label htmlFor="school-type">نوع المدرسة :</label>
            <select
              name="school-type"
              id="school-type"
              ref={typeRef}
              className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
            >
              <option value={""}>الكل </option>
              <option value={"تحفيظ"}>تحفيظ</option>
              <option value={"تربية خاصة"}>تربية خاصة </option>
              <option value={"كبيرات"}>كبيرات </option>
              <option value={"ليلي"}>ليلي </option>
              <option value={"نهاري"}>نهاري </option>
              <option value={"معهد علمي"}>معهد علمي </option>
            </select>
          </div>
        </div>
      </div>

      {/**actions */}
      <div className=" flex w-full gap-4 h-full mt-8">
        <div
          onClick={filterSchools}
          className="bg-[var(--blue-light)] flex-1  h-10 text-black px-2 rounded border cursor-pointer flex justify-center items-center"
        >
          تطبيق الفلاتر
          <span className=" w-5 h-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="Interface / Filter">
                  {" "}
                  <path
                    id="Vector"
                    d="M20 5.6001C20 5.04005 19.9996 4.75981 19.8906 4.5459C19.7948 4.35774 19.6423 4.20487 19.4542 4.10899C19.2403 4 18.9597 4 18.3996 4H5.59961C5.03956 4 4.75981 4 4.5459 4.10899C4.35774 4.20487 4.20487 4.35774 4.10899 4.5459C4 4.75981 4 5.04005 4 5.6001V6.33736C4 6.58195 4 6.70433 4.02763 6.81942C4.05213 6.92146 4.09263 7.01893 4.14746 7.1084C4.20928 7.20928 4.29591 7.29591 4.46875 7.46875L9.53149 12.5315C9.70443 12.7044 9.79044 12.7904 9.85228 12.8914C9.90711 12.9808 9.94816 13.0786 9.97266 13.1807C10 13.2946 10 13.4155 10 13.6552V18.411C10 19.2682 10 19.6971 10.1805 19.9552C10.3382 20.1806 10.5814 20.331 10.8535 20.3712C11.1651 20.4172 11.5487 20.2257 12.3154 19.8424L13.1154 19.4424C13.4365 19.2819 13.5966 19.2013 13.7139 19.0815C13.8176 18.9756 13.897 18.8485 13.9453 18.7084C14 18.5499 14 18.37 14 18.011V13.6626C14 13.418 14 13.2958 14.0276 13.1807C14.0521 13.0786 14.0926 12.9808 14.1475 12.8914C14.2089 12.7911 14.2947 12.7053 14.4653 12.5347L14.4688 12.5315L19.5315 7.46875C19.7044 7.2958 19.7904 7.20932 19.8523 7.1084C19.9071 7.01893 19.9482 6.92146 19.9727 6.81942C20 6.70551 20 6.58444 20 6.3448V5.6001Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </span>
        </div>

        <div
          onClick={resetFilters}
          className="bg-[var(--blue-light)]  h-10 text-black px-2 rounded border cursor-pointer flex justify-center items-center"
        >
          اعادة تعين
          <span className=" w-5 h-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M19 13.5C19 17.6421 15.6421 21 11.5 21C7.35786 21 4 17.6421 4 13.5C4 9.35786 7.35786 6 11.5 6H20M20 6L17 3M20 6L17 9"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </g>
            </svg>
          </span>
        </div>

        <div
          onClick={handleExportExcel}
          className="bg-[var(--blue-light)]  h-10 text-black px-2 rounded border cursor-pointer flex justify-center items-center"
        >
          تصدير أكسل
          <span className=" w-5 h-5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H7C7.55228 21 8 21.4477 8 22C8 22.5523 7.55228 23 7 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM19 12C19.5523 12 20 12.4477 20 13V19H23C23.5523 19 24 19.4477 24 20C24 20.5523 23.5523 21 23 21H19C18.4477 21 18 20.5523 18 20V13C18 12.4477 18.4477 12 19 12ZM11.8137 12.4188C11.4927 11.9693 10.8682 11.8653 10.4188 12.1863C9.96935 12.5073 9.86526 13.1318 10.1863 13.5812L12.2711 16.5L10.1863 19.4188C9.86526 19.8682 9.96935 20.4927 10.4188 20.8137C10.8682 21.1347 11.4927 21.0307 11.8137 20.5812L13.5 18.2205L15.1863 20.5812C15.5073 21.0307 16.1318 21.1347 16.5812 20.8137C17.0307 20.4927 17.1347 19.8682 16.8137 19.4188L14.7289 16.5L16.8137 13.5812C17.1347 13.1318 17.0307 12.5073 16.5812 12.1863C16.1318 11.8653 15.5073 11.9693 15.1863 12.4188L13.5 14.7795L11.8137 12.4188Z"
                  fill="#000000"
                ></path>{" "}
              </g>
            </svg>
          </span>
        </div>
      </div>
      <SchoolList schoolList={schools} />
    </div>
  );
}

const SchoolList = ({ schoolList }) => {
  return (
    <div className="flex flex-col w-full h-96 gap-3  mt-5 items-start">
      <h4 className=" w-full text-start">
        <span>عدد النتائج: </span>
        <span>{schoolList.length ?? "0"}</span>
        <div className="divider border-b-[1px] h-4 w-[90%] mx-2"></div>
      </h4>
      <div className="flex flex-col w-full gap-4 h-80 overflow-y-scroll">
        {schoolList.map((schola, index) => {
          return (
            <div
              key={index}
              className="flex flex-col bg-gray-200 text-[var(--blue-dark)] shadow-md  items-start gap-1 rounded-md w-4/5 px-4  py-2  h-30"
            >
              <div className=" font-bold text-xl">{schola.name}</div>
              <span>{schola.quarter}</span>
              <div className="font-semibold flex ">
                <span>{schola.sector}</span>
                <span
                  className={` w-4 h-4 mx-2 mt-2  card-schola-${schola.sectorId}`}
                ></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
