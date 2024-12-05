import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Ads from "./components/Ads";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateAd from "./components/CreateAd";
import ManageUsers from "./components/ManageUsers";
import ManageAds from "./components/ManageAds";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/ads" element={<Ads />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-ad" element={<CreateAd />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-ads" element={<ManageAds />} />
      </Routes>
    </Router>
  );
};

export default App;
