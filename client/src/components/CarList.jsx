import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CarList = () => {
  const cars = useSelector((state) => state.cars.list);
  console.log("cars", cars);

  if (cars.length === 0) {
    return <p className="text-center text-gray-500">No cars found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Car Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="h-48 overflow-hidden rounded-t-lg">
              <img
                src={car.images[0] || "/placeholder-image.png"} // Default placeholder image
                alt={car.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                {car.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {car.description || "No description available."}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/cars/${car._id}`}
                  className="text-sm text-blue-600 hover:text-blue-800 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
