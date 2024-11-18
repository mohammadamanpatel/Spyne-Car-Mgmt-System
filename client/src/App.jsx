import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CarDetails from "./components/CarDetails";
import AddCar from "./components/AddCar";
import UpdateCar from "./components/UpdateCar";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/cars/create" element={<AddCar />} />
          <Route path="/cars/edit/:id" element={<UpdateCar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
