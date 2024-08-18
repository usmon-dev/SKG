"use client";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import SKG from "./components/SKG";
import Login from "./pages/auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SKG />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
