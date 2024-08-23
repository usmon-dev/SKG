"use client";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import SKG from "./components/SKG";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SKG />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
