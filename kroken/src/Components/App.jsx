import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Auth/SignUp/SignUp";
import SignIn from "./Auth/SignIn/SignIn";
import Home from "./Home/Home";
import Owner from "./Users/Owner/Owner";
import Visitor from "./Users/Visitor/Visitor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/user" element={<Visitor />} />
        <Route path="/signup/owner" element={<Navigate to="/owner" />} />
        <Route path="/signup/user" element={<Navigate to="/user" />} />
        
      </Routes>
    </>
  );
}

export default App;