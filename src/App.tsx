"use client";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import SKGwithoutAcc from "./components/SKGwithoutAcc";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SKGwithoutAcc />} />
      </Routes>
    </>
  );
}

export default App;
