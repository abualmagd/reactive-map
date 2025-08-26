import { useRef, useState } from "react";
import { notify } from "../services/utils";
import { getUserByName, updateAdminPassword } from "../services/adminServices";
import { ToastContainer } from "react-toastify";

export default function EditPassword() {
  const [type, setType] = useState("password");
  const [typeOld, setTypeOld] = useState("password");
  const newPassRef = useRef();
  const oldPassRef = useRef();
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (oldPassRef.current.value === newPassRef.current.value) {
      notify("الباسورد الجديد يشبه القديم", "error");
      setLoading(false);
    } else {
      try {
        const data = await getUserByName(emailRef.current.value);
        if (oldPassRef.current.value !== data.password) {
          notify(" خطا في الباسورد", "error");
          setLoading(false);
        } else {
          await updateAdminPassword(
            emailRef.current.value,
            newPassRef.current.value
          );
          setLoading(false);
          notify("الباسورد اتحدث", "success");
        }
      } catch (error) {
        notify("خطا في المعلومات" + String(error), "error");
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={submit} className=" shadow flex flex-col max-w-80  mr-12">
      <div className=" flex flex-col gap-2.5 items-start w-full">
        <label htmlFor="school-supero"> الاسم:</label>
        <div className="flex w-full">
          <input
            type="text"
            name="supervisor"
            id="school-supero"
            ref={emailRef}
            placeholder="  اسم الادمن"
            className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
          />
        </div>
      </div>
      <div className=" flex flex-col gap-2.5 items-start w-full">
        <label htmlFor="school-super"> الرقم السري القديم:</label>
        <div className="flex w-full">
          <input
            type={typeOld}
            name="supervisor"
            id="school-super"
            ref={oldPassRef}
            placeholder="   الرقم السري.."
            className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
          />
          <button
            type="button"
            onClick={() => {
              if (typeOld === "password") {
                //console.log("p");
                setTypeOld("text");
              } else {
                setTypeOld("password");
                //console.log("t");
              }
            }}
          >
            {typeOld !== "text" ? "اعرض" : "اخفي"}
          </button>
        </div>
      </div>
      <div className=" flex flex-col gap-2.5 items-start w-full">
        <label htmlFor="school-super"> الرقم السري الجديد:</label>
        <div className="flex w-full">
          <input
            type={type}
            name="supervisor"
            id="school-super"
            ref={newPassRef}
            placeholder="   الرقم السري الجديد."
            className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
          />
          <button
            type="button"
            onClick={() => {
              if (type === "password") {
                //console.log("p");
                setType("text");
              } else {
                setType("password");
                //console.log("t");
              }
            }}
          >
            {type !== "text" ? "اعرض" : "اخفي"}
          </button>
        </div>
      </div>
      <div className="divider h-4"></div>
      {!loading ? (
        <input
          type="submit"
          value={"  حفظ "}
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
      )}{" "}
      <div className="h-10"></div>
    </form>
  );
}
