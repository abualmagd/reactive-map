import AddSchoolSection from "./components/addSchoolSection";
import "./App.css";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";

export default function Admin() {
  return (
    <ProtectedRoute>
      <div className="w-full h-full flex-1 flex flex-col  items-center justify-start text-white">
        <p className=" px-3 py-2 rounded-xl bg-blue-200/20 my-3 text-xl font-bold w-fit text-white">
          تعديل المدارس – منطقة الرياض
        </p>
        <div className="h-5"></div>
        <Link to={"/"}>ارجع للرئيسية</Link>
        <div className="h-5"></div>
        <div className="  w-full h-full flex lg:flex-row flex-col  lg:items-start items-center gap-4 flex-1">
          <AddSchoolSection />
        </div>

        <ToastContainer />
      </div>
    </ProtectedRoute>
  );
}
