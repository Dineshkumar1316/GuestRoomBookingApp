import React from "react";
import "./App.css";
import Navbar from "./components/Common/Navbar/Navbar";
import Footer from "./components/Common/Footer/Footer";
import Home from "./components/Pages/Home";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import UserDashboard from "./components/Dashboard/UserDashboard";
import HouseOwnerDashboard from "./components/Dashboard/HouseOwnerDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/houseowner-dashboard" element={<HouseOwnerDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
