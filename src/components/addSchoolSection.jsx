import { useRef, useState } from "react";
import { importFromExcels } from "../services/excelServices";
import {
  createManySchools,
  createNewSchool,
} from "../services/schoolsServices";
import { notify } from "../services/utils";
import EditSchool from "./editSchool";
import { ToastContainer } from "react-toastify";

export default function AddSchoolSection() {
  const [loading, updateLoading] = useState(false);
  const [loadingSchool, updateLoadingSchool] = useState(false);
  const [file, updateFile] = useState(null);
  const typeRef = useRef();
  const genderRef = useRef();
  const stageRef = useRef();
  const nameRef = useRef();
  const quarterRef = useRef();
  const managerRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const sectorRef = useRef();
  const roleRef = useRef();
  const supervisorRef = useRef();
  const latRef = useRef();
  const longRef = useRef();
  const numberRef = useRef();
  const nameSector = (id) => {
    switch (id) {
      case 1:
        return "التجمع الصحي الأول";

      case 2:
        return "التجمع الصحي الثاني";

      case 3:
        return "التجمع الصحي الثالث";

      case 4:
        return "لا تتبع أي تجمع";

      default:
        return "";
    }
  };
  const handleChangeInput = (e) => {
    if (e.target.files[0]) {
      updateFile(e.target.files[0]);
    }
  };

  const saveDataFromExcelFile = async () => {
    if (file) {
      updateLoading(true);
      try {
        const data = await importFromExcels(file);
        const res = await createManySchools(data);
        console.log(res);
        updateLoading(false);
        notify("تم الاضافة بنجاح", "success");
      } catch (error) {
        console.log(error);
        updateLoading(false);
        notify("فشل الاضافة" + String(error), "error");
      }
    }
  };

  const saveNewSchool = async () => {
    if (nameRef.current?.value) {
      updateLoadingSchool(true);
      try {
        const res = await createNewSchool({
          number: numberRef.current?.value ?? "",
          name: nameRef.current?.value,
          quarter: quarterRef.current?.value ?? "",
          sector: nameSector(sectorRef.current?.value),
          sectorId: sectorRef.current?.value ?? 4,
          stage: stageRef.current?.value ?? "",
          gender: genderRef.current?.value ?? "",
          rule: roleRef.current?.value ?? "",
          type: typeRef.current?.value ?? "",
          manager: managerRef.current?.value ?? "",
          email: emailRef.current?.value ?? "",
          phone: phoneRef.current?.value ?? "",
          supervisor: supervisorRef.current?.value ?? "",
          latitude: latRef.current?.value ?? "",
          longitude: longRef.current?.value ?? "",
        });
        console.log(res);
        notify("تم الاضافة بنجاح", "success");
        updateLoadingSchool(false);
      } catch (error) {
        console.log(error);
        notify("فشل الاضافة", "error");
        updateLoadingSchool(false);
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    await saveNewSchool();
  };
  return (
    <div className=" px-6 flex-1 w-full">
      <p className=" font-bold text-3xl w-60 shadow rounded px-2 py-1  text-center">
        اضافة المدارس
      </p>
      <div className="h-10"></div>
      <div className="add-from-file flex flex-col">
        <p className=" text-xl mt-3 mb-6 font-semibold">اضافة من ملف اكسيل</p>
        <div className="flex gap-6 my-2">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            ارفق الملف{" "}
          </label>
          <input
            className="block w-44 text-center  items-center h-6 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[var(--gray)]"
            id="file_input"
            type="file"
            onChange={(e) => handleChangeInput(e)}
            accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
        <div className="h-3"></div>
        {!loading ? (
          <button
            onClick={saveDataFromExcelFile}
            className="text-white max-w-60 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {" "}
            احفظ الداتا من الملف
          </button>
        ) : (
          <button
            disabled
            className="text-white max-w-60 bg-blue-100  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {" "}
            يتم الحفظ ....
          </button>
        )}
      </div>

      <div className="divider border-2 w-full mt-4"></div>
      <form
        onSubmit={submit}
        className="add-from-inputs mt-5 flex-1 flex flex-col w-full"
      >
        <div className=" flex flex-col w-full gap-4 h-full mt-5">
          <h3 className=" text-xl mt-3 mb-6 font-semibold">
            اضافة مدرسة يدويا
          </h3>
          <div className="grid lg:grid-cols-2 grid-cols-1 w-full ">
            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-name"> اسم المدرسة:</label>
              <input
                required
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

            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-manager"> اسم المدير:</label>
              <input
                type="text"
                name="school-manager"
                id="school-manager"
                ref={managerRef}
                placeholder=" أكتب اسم المدير.."
                className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
              />
            </div>

            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-phone"> جوال المدير:</label>
              <input
                type="tel"
                name="school-phone"
                id="school-phone"
                ref={phoneRef}
                placeholder="9966...."
                className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
              />
            </div>

            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-email"> ايميل المدير:</label>
              <input
                type="email"
                name="school-email"
                id="school-email"
                ref={emailRef}
                placeholder=" أكتب  الايميل.."
                className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
              />
            </div>

            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-super"> اسم المشرف:</label>
              <input
                type="text"
                name="school-super"
                id="school-super"
                ref={supervisorRef}
                placeholder=" أكتب  المشرف.."
                className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
              />
            </div>
            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-number"> الرقم الوزاري :</label>
              <input
                type="number"
                ref={numberRef}
                name="school-number"
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
                ref={longRef}
                name="school-long"
                id="school-long"
                placeholder=" ..."
                className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
              />
            </div>

            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-lat">خط العرض :</label>
              <input
                type="number"
                ref={latRef}
                step={"any"}
                name="school-lat"
                id="school-lat"
                placeholder=".."
                className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
              />
            </div>
          </div>
          <div className="w-full grid  lg:grid-cols-4 grid-cols-2 my-5  filters-selects  gap-5 justify-between">
            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-sector">التجمع الصحي :</label>
              <select
                name="school-sector"
                ref={sectorRef}
                id="school-sector"
                className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
              >
                <option value={""}> </option>
                <option value={1}>الأول </option>
                <option value={2}>الثاني </option>
                <option value={3}>الثالث </option>
                <option value={4}>لا تتبع </option>
                <option value={5}>لا تدخل ضمن </option>
              </select>
            </div>

            <div className=" flex flex-col gap-2.5 items-start w-full">
              <label htmlFor="school-gender">الجنس :</label>
              <select
                name="school-gender"
                ref={genderRef}
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
                name="school-stage"
                ref={stageRef}
                id="school-staege"
                className=" outline-none cursor-pointer min-w-30 bg-[var(--gray)]  h-10 text-black px-2 rounded"
              >
                <option value={""}> </option>
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
      <div className="divider border-2 my-8 w-full"></div>
      <EditSchool />
      <ToastContainer />
    </div>
  );
}
