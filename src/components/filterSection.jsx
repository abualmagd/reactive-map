import { useContext, useState } from "react";
import { SchoolContext } from "../context/school";
import { InitialContext } from "../context/initialContext";

export default function FilterSection() {
  const { setSchools } = useContext(SchoolContext);
  const [sectors, updateSectors] = useState([1, 2, 3]);
  const { data } = useContext(InitialContext);

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

  return (
    <div className=" flex-1 flex flex-col bg-red  h-full min-h-[600px] items-start mx-2 ">
      <div className="sectors-chooser gap-2 flex flex-col p-2">
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
            className="cursor-pointer flex bg-transparent px-2 py-1 rounded-md peer-checked:bg-blue-500 font-semibold"
          >
            <span>التجمع الصحي الأول</span>{" "}
            <span className="block w-3 h-3 mx-1 mt-2 bg-[#a7bc14]"></span>
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
            className="cursor-pointer flex bg-transparent px-2 py-1 rounded-md peer-checked:bg-blue-500 font-semibold"
          >
            <span>التجمع الصحي الثاني</span>{" "}
            <span className="block w-3 h-3 mx-1 mt-2 rounded bg-[#0047b3]"></span>
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
            className="cursor-pointer flex bg-transparent px-2 py-1 rounded-md peer-checked:bg-blue-500 font-semibold"
          >
            <span>التجمع الصحي الثالث</span>{" "}
            <span className="block w-3 h-3 mx-1 mt-2 rounded-full bg-[#66fb61]"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
