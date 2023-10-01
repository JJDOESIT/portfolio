import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./pages/home";
import Portfolio from "./pages/portfolio";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import About from "./pages/about";
import "./styles/index.css";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar></Navbar>
        <Home></Home>
      </>
    ),
  },
  {
    path: "about/",
    element: (
      <>
        <Navbar></Navbar>
        <About></About>
      </>
    ),
  },
  {
    path: "projects/",
    element: (
      <>
        <Navbar></Navbar>
        <Portfolio></Portfolio>
      </>
    ),
  },
  {
    path: "contact/",
    element: (
      <>
        <Navbar></Navbar>
        <Contact></Contact>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router}></RouterProvider>
  </>
);
