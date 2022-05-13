import React from 'react';
import { Signin, Signup } from "./pages";
import { Routes, Route } from "react-router-dom";
import "./assets/styles/master.scss";
import "./assets/styles/index.css";
import Splash from "./pages/splash";
import Dashboard from "./pages/dashboard";
import { Helmet } from "react-helmet";
// import { useSelector, useStore } from "react-redux";
// import { AuthState } from "./redux/modules/auth/authSlice";
// import { db } from "./utils/levelDB";
function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>C H O K I D R</title>
        <link rel="canonical" href="https://happymonk.ai" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
