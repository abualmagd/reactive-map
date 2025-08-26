import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/home";
import { SchoolContext } from "./context/school";
import { InitialContext } from "./context/initialContext";
import { getAllSchools } from "./services/schoolsServices";

function App() {
  const [mySchools, setMySchools] = useState([]);
  const [myData, setMyData] = useState([]);
  const [loading, updateLoading] = useState(true);

  useEffect(() => {
    getDbSchools();
  }, []);

  const getDbSchools = async () => {
    try {
      const respo = await getAllSchools();
      setMySchools(respo);
      setMyData(respo);
      // console.log(respo);
      updateLoading(false);
    } catch (error) {
      console.log(error);
      updateLoading(false);
    }
  };

  if (loading) {
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
