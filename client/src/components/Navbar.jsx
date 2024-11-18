import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "../features/carSlice";
import { searchCars } from "../api/carApi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleSearchChange = async (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (keyword.trim().length > 0) {
      try {
        const cars = await searchCars(keyword);
        console.log("cars by search",cars)
        if (cars.error) {
          console.error(cars.error);
        } else {
          setSearchResults(cars);
          setShowSearchResults(true);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (carId) => {
    navigate(`/cars/${carId}`); // Navigate to the car's details page
    setSearchTerm("");
    setShowSearchResults(false);
  };

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo/Title */}
        <Link to="/" className="text-2xl font-bold">
          Car Management
        </Link>

        {/* Search Bar */}
        <div className="relative w-full sm:w-1/2 lg:w-1/3 mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {showSearchResults && (
            <div className="absolute z-10 bg-white text-black w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((car) => (
                  <div
                    key={car.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearchResultClick(car.id)}
                  >
                    {car.title}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 mt-4 sm:mt-0">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:underline text-lg">
                Login
              </Link>
              <Link to="/register" className="hover:underline text-lg">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline text-lg">
                Dashboard
              </Link>
              <Link to="/profile" className="hover:underline text-lg">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline text-lg text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
