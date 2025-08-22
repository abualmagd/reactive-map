import { useEffect, useState } from "react";
import {
  deleteSchool,
  getAllSchools,
  updateSchool,
} from "../services/schoolsServices";
import { notify } from "../services/utils";

export default function EditSchool() {
  const [schola, updateSchola] = useState();
  const [schools, updatSchools] = useState();
  const [data, updatData] = useState();
  const nameRef = useState();

  const search = () => {
    const nameValue = nameRef.current?.value.trim().toLowerCase();
    let filtered = data;

    if (nameValue) {
      console.log("here");
      filtered = filtered.filter((schola) =>
        schola.name?.toLowerCase().includes(nameValue)
      );
      updatSchools(filtered);
    } else {
      updatSchools(filtered);
    }
  };

  const getDbSchools = async () => {
    try {
      const respo = await getAllSchools();
      updatSchools(respo);
      updatData(respo);
      console.log(" from editing", respo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDbSchools();
  }, []);

  const moveToFixero = () => {
    const element = document.getElementById("fixero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <p className=" text-xl mt-3 mb-6 font-semibold"> تعديل مدرسة </p>
      <div className="flex lg:flex-row flex-col w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-60">
            <label htmlFor="nameo">ابحث باسم المدرسة</label>
            <input
              type="text"
              name="nameo"
              id="nameo"
              ref={nameRef}
              onChange={() => search()}
              className=" outline-none bg-[var(--gray)]/20 w-full my-2 h-10 text-white px-2 rounded"
            />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 w-full h-72 overflow-y-scroll ">
            {schools?.map((sch, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    moveToFixero();
                    updateSchola(sch);
                  }}
                  className={`flex w-52 h-20 items-center justify-center text-black px-2  my-2 rounded shadow cursor-pointer  ${
                    sch.id === schola?.id ? "bg-blue-600" : "bg-[var(--gray)]"
                  }`}
                >
                  <h2>{sch.name}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" mx-4 w-full">
          {schola && <FixerSection school={schola} />}
        </div>
      </div>
    </div>
  );
}

const FixerSection = ({ school }) => {
  const [loadingSchool, updateLoadingSchool] = useState(false);
  const [skool, updateSkool] = useState({
    id: school.id ?? " ",
    number: school.number ?? "",
    name: school.name ?? "",
    quarter: school.quarter ?? "",
    sector: school.sector ?? "",
    sectorId: school.sectorId ?? "",
    stage: school.stage ?? "",
    gender: school.gender ?? "",
    rule: school.rule ?? "",
    type: school.type ?? "",
    manager: school.manager ?? "",
    email: school.email ?? "",
    phone: school.phone ?? "",
    supervisor: school.supervisor ?? "",
    latitude: school.latitude ?? "",
    longitude: school.longitude ?? "",
  });

  const handleChange = (e) => {
    updateSkool((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    updateSkool({
      id: school.id ?? " ",
      number: school.number ?? "",
      name: school.name ?? "",
      quarter: school.quarter ?? "",
      sector: school.sector ?? "",
      sectorId: school.sectorId ?? "",
      stage: school.stage ?? "",
      gender: school.gender ?? "",
      rule: school.rule ?? "",
      type: school.type ?? "",
      manager: school.manager ?? "",
      email: school.email ?? "",
      phone: school.phone ?? "",
      supervisor: school.supervisor ?? "",
      latitude: school.latitude ?? "",
      longitude: school.longitude ?? "",
    });
  }, [school]);

  const handleChangeSectorName = (e) => {
    if (e.target.value) {
      updateSkool((prev) => ({
        ...prev,
        sector: sectoring(e.target.value),
        sectorId: e.target.value,
      }));
    }
  };

  const sectoring = (id) => {
    const sectorMap = {
      1: "التجمع الصحي الأول",
      2: "التجمع الصحي الثاني",
      3: "التجمع الصحي الثالث",
      4: "لا تتبع أي تجمع",
      5: "لا تدخل ضمن تطبيق الخطة المشتركه ولا التجمعات الصحية",
    };

    // Handle string numbers, null, undefined, and empty values
    const normalizedId =
      id === null || id === undefined || id === "" ? 4 : Number(id);

    return sectorMap[normalizedId] || "لا تتبع أي تجمع"; // Default fallback
  };

  //update school
  const submit = async (e) => {
    e.preventDefault();
    try {
      updateLoadingSchool(true);
      await updateSchool(skool);
      notify("تم النحديث", "success");
      //updateSkool(res)
      updateLoadingSchool(false);
    } catch (error) {
      notify(`خطأ في التصحيح  + ${String(error)}`, "error");
      console.log(error);
      updateLoadingSchool(false);
    }
  };

  const showDialog = () => {
    document.getElementById("sureModal").showModal();
  };
  return (
    <div className=" mx-4 w-full" id="fixero">
      {school && (
        <form
          onSubmit={submit}
          className="add-from-inputs mt-5 flex-1 flex flex-col w-full"
        >
          <div className=" flex flex-col w-full gap-4 h-full">
            <div className="grid lg:grid-cols-2 grid-cols-1 w-full ">
              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-name"> اسم المدرسة:</label>
                <input
                  required
                  type="text"
                  name="name"
                  id="school-name"
                  onChange={handleChange}
                  value={skool.name}
                  placeholder=" أكتب اسم المدرسة.."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-quarter">الحي :</label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={skool.quarter}
                  name="quarter"
                  id="school-quarter"
                  placeholder=" أكتب اسم الحي.."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-manager"> اسم المدير:</label>
                <input
                  type="text"
                  name="manager"
                  id="school-manager"
                  onChange={handleChange}
                  value={skool.manager}
                  placeholder=" أكتب اسم المدير.."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-phone"> جوال المدير:</label>
                <input
                  type="tel"
                  name="phone"
                  id="school-phone"
                  onChange={handleChange}
                  value={skool.phone}
                  placeholder="9966...."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-email"> ايميل المدير:</label>
                <input
                  type="email"
                  name="email"
                  id="school-email"
                  onChange={handleChange}
                  value={skool.email}
                  placeholder=" أكتب  الايميل.."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-super"> اسم المشرف:</label>
                <input
                  type="text"
                  name="supervisor"
                  id="school-super"
                  onChange={handleChange}
                  value={skool.supervisor}
                  placeholder=" أكتب  المشرف.."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>
              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-number"> الرقم الوزاري :</label>
                <input
                  type="number"
                  onChange={handleChange}
                  value={skool.number}
                  name="number"
                  id="school-number"
                  placeholder=" ..."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>
              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-long">خط الطول :</label>
                <input
                  type="number"
                  step={"any"}
                  onChange={handleChange}
                  value={skool.longitude}
                  name="longitude"
                  id="school-long"
                  placeholder=" ..."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-lat">خط العرض :</label>
                <input
                  type="number"
                  onChange={handleChange}
                  value={skool.latitude}
                  step={"any"}
                  name="latitude"
                  id="school-lat"
                  placeholder=".."
                  className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
                />
              </div>
            </div>
            <div className="w-full grid  lg:grid-cols-2 grid-cols-2 my-5  filters-selects  gap-5 justify-between">
              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-sector">التجمع الصحي :</label>
                <select
                  name="sectorId"
                  onChange={handleChangeSectorName}
                  value={skool.sectorId}
                  id="school-sector"
                  className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
                >
                  <option value={""}> </option>
                  <option value={1}>الأول </option>
                  <option value={2}>الثاني </option>
                  <option value={3}>الثالث </option>
                  <option value={4}>لا تببع </option>
                  <option value={5}>لا تدخل ضمن تطبيق الخطة</option>
                </select>
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-gender">الجنس :</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  value={skool.gender}
                  id="school-gender"
                  className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
                >
                  <option value={""}> </option>
                  <option value={"بنين"}>بنين </option>
                  <option value={"بنات"}>بنات </option>
                </select>
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-stage">المرحلة :</label>
                <select
                  name="stage"
                  onChange={handleChange}
                  value={skool.stage}
                  id="school-staege"
                  className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
                >
                  <option value={""}> </option>
                  <option value={"التعليم المستمر"}>التعليم المستمر </option>
                  <option value={"المرحلة الأبتدائية"}>
                    المرحلة الأبتدائية
                  </option>
                  <option value={"التعليم المتوسطة"}>المرحلة المتوسطة </option>
                  <option value={"المرحلة الثانوية"}>المرحلة الثانوية </option>
                  <option value={"رياض أطفال"}>رياض أطفال </option>
                </select>
              </div>

              <div className=" flex flex-col gap-2.5 items-start w-full">
                <label htmlFor="school-type">نوع المدرسة :</label>
                <select
                  name="type"
                  onChange={handleChange}
                  value={skool.type}
                  className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
                >
                  <option value={""}> </option>
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

          {!loadingSchool ? (
            <input
              type="submit"
              value={" احفظ التعديلات"}
              className="text-white max-w-60 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            ></input>
          ) : (
            <button
              disabled
              className="text-white max-w-60 bg-blue-100  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {" "}
              يتم الحفظ ....
            </button>
          )}
        </form>
      )}
      <button
        onClick={showDialog}
        className="text-white max-w-60 cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        أحذف تلك المدرسة
      </button>
      <AreYouShureModal skoolId={skool.id} />
    </div>
  );
};

const AreYouShureModal = ({ skoolId }) => {
  const removeSk = async () => {
    try {
      await deleteSchool(skoolId);
      closeDialog();
      notify("تم الحذف", "success");
    } catch (error) {
      closeDialog();
      notify(error + " خطأ في حذف المدرسة", "error");
    }
  };

  const closeDialog = () => {
    document.getElementById("sureModal").close();
  };

  return (
    <dialog id="sureModal">
      <div className=" bg-amber-100/5 flex overflow-y-auto overflow-x-hidden fixed top-0 bottom-0  right-0 left-0 z-50  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative mt-auto p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white  rounded-lg shadow-sm dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                هل أنت متأكد من حذف المدرسة
              </h3>
              <button
                onClick={removeSk}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                نعم أكيد
              </button>
              <button
                onClick={closeDialog}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                لا ألغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
