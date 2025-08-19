import "./App.css";
import PartsMap from "./components/partsMap";
import ReactiveMap from "./components/reactiveMap";
import SectorsMap from "./components/sectorMap";

function App() {
  return (
    <div className=" bg-amber-300 w-full h-full flex flex-1">
      <SectorsMap />
    </div>
  );
}

export default App;
