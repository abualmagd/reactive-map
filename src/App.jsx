import React, { useState } from "react";
import "./App.css";
import Home from "./components/home";
import { PageContext } from "./context/pageContext";

function App() {
  const [page, setPage] = useState("main");
  return (
    <PageContext.Provider value={{ page, setPage }}>
      <Home />;
    </PageContext.Provider>
  );
}

export default App;
