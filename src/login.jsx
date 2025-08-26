import { useRef, useState } from "react";
import { notify } from "./services/utils";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { getUserByName } from "./services/adminServices";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const nav = useNavigate();
  const [type, setType] = useState("password");

  //use effect get admin

  const submit = async (e) => {
    e.preventDefault();
    //console.log(emailRef.current.value);
    if (emailRef.current.value && passRef.current.value) {
      try {
        const data = await getUserByName(emailRef.current.value);
        // console.log("admin data ", data);
        setLoading(true);
        if (
          emailRef.current.value !== data.name ||
          passRef.current.value !== data.password
        ) {
          notify("خطأ في الاسم او الباسورد", "error");
          console.error("err");
        } else {
          localStorage.setItem("isAuthenticated", "auth");
          setLoading(false);
          console.log("okay");
          nav("/admin");
        }
      } catch (error) {
        notify(String(error), "error");
      }

      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-linear-to-tr from-[#26377d] to-[#253779]">
      <form onSubmit={submit} className="w-96 text-white">
        <div className=" flex flex-col gap-2.5 items-start w-full">
          <label htmlFor="school-super"> اسم المستخدم:</label>
          <input
            type="text"
            name="supervisor"
            ref={emailRef}
            id="school-super"
            placeholder="   اسم المستخدم.."
            className=" outline-none bg-[var(--gray)] w-2/3 h-10 text-black px-2 rounded"
          />
        </div>
        <div className=" flex flex-col gap-2.5 items-start w-full">
          <label htmlFor="school-super"> الرقم السري:</label>
          <div className="flex w-full">
            <input
              type={type}
              name="supervisor"
              id="school-super"
              ref={passRef}
              placeholder="   الرقم السري.."
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
            value={"  تسجيل الدخول"}
            className="text-white max-w-60 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          ></input>
        ) : (
          <button
            disabled
            className="text-white max-w-60 bg-blue-100  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {" "}
            يتم التسجيل ....
          </button>
        )}{" "}
      </form>
      <ToastContainer />
    </div>
  );
}
