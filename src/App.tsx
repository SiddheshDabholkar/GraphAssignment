import React from "react";
import { Route, Routes } from "react-router-dom";
import Bonus from "./pages/Bonus";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bonus" element={<Bonus />} />
    </Routes>
  );
};

export default App;
