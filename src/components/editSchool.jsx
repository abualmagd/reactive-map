import { useEffect, useState } from "react";
import { getAllSchools } from "../services/schoolsServices";

export default function EditSchool() {
  const [schola, updateSchola] = useState();
  const [schools, updatSchools] = useState();
  const [data, updatData] = useState();
  const nameRef = useState();

  // eslint-disable-next-line no-unused-vars
  const search = () => {
    const nameValue = nameRef.current?.value.trim().toLowerCase();
    let filtered = data;

    if (nameValue) {
      filtered = filtered.filter((schola) =>
        schola.name?.toLowerCase().includes(nameValue)
      );
    }
    //find
    updateSchola(filtered);
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

  return (
    <div className="flex flex-col w-full">
      <p className=" text-xl mt-3 mb-6 font-semibold"> تعديل مدرسة </p>
      <div className="flex w-full">
        <div className="flex flex-col w-full">
          /**search inputs */
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 w-full h-[600px] overflow-y-scroll ">
            {schools?.map((schola) => {
              return (
                <div
                  onClick={() => updateSchola(schola)}
                  className="flex w-52 h-20 items-center justify-center text-black px-2 bg-[var(--gray)] my-2 rounded shadow cursor-pointer"
                >
                  <h2>{schola.name}</h2>
                </div>
              );
            })}
          </div>
        </div>

        {schola && <FixerSection school={schola} />}
      </div>
    </div>
  );
}

const FixerSection = ({ school }) => {
  console.log(school);
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
    if (e.target.value) {
      updateSkool((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
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
  const submit = (e) => {
    e.preventDefault();
    updateLoadingSchool(true);
  };

  return (
    <div className=" mx-4 w-full">
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
              value={" احفظ المدرسة"}
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
    </div>
  );
};
