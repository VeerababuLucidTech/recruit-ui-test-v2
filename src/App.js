import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Global.css";
import "../src/styles/Lucid.css";
import Login from "./components/loginSignup/Login";
import Signup from "./components/loginSignup/Signup";
import Layout from "./components/Layout";

function App() {

  return (
    <>
      <div className="lucid-bg">
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;