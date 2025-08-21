import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/home";
import { SchoolContext } from "./context/school";
import { schoolsData } from "./data";
import { InitialContext } from "./context/initialContext";

function App() {
  const [mySchools, setMySchools] = useState([]);
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    const data = getSchools();
    setMySchools(data);
    setMyData(data);
  }, []);

  const getSchools = () => {
    return schoolsData;
  };

  if (!mySchools) {
    <div>loading</div>;
  }
  return (
    <InitialContext.Provider value={{ data: myData, setData: setMyData }}>
      <SchoolContext.Provider
        value={{ schools: mySchools, setSchools: setMySchools }}
      >
        <Home />;
      </SchoolContext.Provider>
    </InitialContext.Provider>
  );
}

export default App;
