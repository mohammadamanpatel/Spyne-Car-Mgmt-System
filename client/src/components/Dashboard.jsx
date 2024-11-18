import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "../features/carSlice";
import { fetchUserCars, searchCars } from "../api/carApi";
import CarList from "../components/CarList";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {user,token} = useSelector((state)=>state.auth);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const cars = await fetchUserCars(token);
        console.log("cars in dashboard",cars)
        if (cars.error) {
          setError(cars.error);
        } else {
          dispatch(setCars(cars));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [dispatch,token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Link
        to="/cars/create"
        className="bg-blue-600 text-white p-2 rounded mb-4 inline-block"
      >
        Add New Car
      </Link>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <CarList />}
    </div>
  );
}

export default Dashboard;
