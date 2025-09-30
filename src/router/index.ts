import { createBrowserRouter } from "react-router";
import React from "react";

const Home = React.lazy(() => import("@/pages/home"));
const Sort = React.lazy(() => import("@/pages/sort"));

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/sort", Component: Sort },
]);
