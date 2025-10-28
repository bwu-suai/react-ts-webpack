import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import RootLayout from "@/layout/RouteTransition";

const Home = lazy(() => import("@/pages/home"));
const Sort = lazy(() => import("@/pages/sort"));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index={true} element={<Home />}></Route>
          <Route path="/sort" element={<Sort />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
