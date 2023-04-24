import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MusicsProvider } from "./context/MusicsContext";

const Chart = lazy(() => import("./pages/Chart"));
const Detail = lazy(() => import("./pages/Detail"));

const App = () => {
  return (
    <>
      <MusicsProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/chart" element={<Chart />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Suspense>
      </MusicsProvider>
    </>
  );
};

export default App;
