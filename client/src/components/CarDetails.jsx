import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCar, deleteCar } from "../features/carSlice";
import { fetchCarById } from "../api/carApi";
import { deleteCar as deleteCarApi } from "../api/carApi";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  console.log("car",car)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getCarDetails = async () => {
      try {
        const data = await fetchCarById(id, token);
        setCar(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setLoading(false);
      }
    };

    getCarDetails();
  }, [id, token]);

  const handleUpdate = () => {
    navigate(`/cars/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const response = await deleteCarApi(id, token);
        if (response.error) {
          alert(response.error);
        } else {
          dispatch(deleteCar(id));
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("There was an error deleting the car.");
      }
    }
  };

  if (loading) return <p>Loading car details...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Car Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Images Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {car && car.images.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-48 overflow-hidden rounded-lg border border-gray-200"
            >
              <img
                src={image}
                alt={`Car image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>

        {/* Car Details */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{car.title}</h2>
          <p className="text-gray-600 mb-4">{car.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleUpdate}
          >
            Edit Car
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={handleDelete}
          >
            Delete Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
