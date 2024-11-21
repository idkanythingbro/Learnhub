import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from "./components/HomePage.jsx";
import App from "./App.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignUpPage from "./components/pages/SignUpPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
