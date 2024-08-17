"use client";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import SKG from "./components/SKG";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SKG />} />
      </Routes>
    </>
  );
}

export default App;
