import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "@/layout/RouteTransition";

const Home = lazy(() => import("@/pages/home"));
const Sort = lazy(() => import("@/pages/sort"));
const ListPage = lazy(() => import("@/pages/listpage"));
const NotFound = lazy(() => import("@/pages/notFound"));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index={true} element={<Home />}></Route>
          <Route path="/sort" element={<Sort />}></Route>
          <Route path="/listpage" element={<ListPage />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
