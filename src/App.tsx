import React from "react";
import { router } from "./router/index";
import { RouterProvider } from "react-router";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
