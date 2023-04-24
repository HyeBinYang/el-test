import React from "react";
import { Route, Routes } from "react-router-dom";
import Chart from "./pages/Chart";
import Detail from "./pages/Detail";
import { MusicsProvider } from "./context/MusicsContext";

const App = () => {
  return (
    <>
      <MusicsProvider>
        <Routes>
          <Route path="/chart" element={<Chart />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </MusicsProvider>
    </>
  );
};

export default App;
