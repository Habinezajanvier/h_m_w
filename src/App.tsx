import { Signin, Signup } from "./pages";
import { Routes, Route, Link } from "react-router-dom";
import "./assets/styles/master.scss";
import "./assets/styles/index.css";
import Splash from "./pages/splash";
import Test from "./pages/test";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/test" element={<Test />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
