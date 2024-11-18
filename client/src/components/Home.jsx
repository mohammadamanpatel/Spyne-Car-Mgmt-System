import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllCars, fetchUserCars, searchCars } from "../api/carApi";
import { setCars } from "../features/carSlice";
import { logout } from "../features/authSilce";

const Home = () => {
  const { list } = useSelector((state) => state.cars);
  console.log("list", list);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = user && token;

  useEffect(() => {
    const getCars = async () => {
      const cars = await fetchUserCars(token);
      // console.log("cars in home",cars)
      dispatch(setCars(cars));
    };
    getCars();
  }, [dispatch]);

  const handleSearchChange = async (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (keyword.trim().length > 0) {
      try {
        const cars = await searchCars(keyword);
        console.log("cars by search", cars);
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
    dispatch(logout()); // Dispatch logout action
    navigate("/login");
  };

  return (
    <>
      {/* Navbar Section */}
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold">
              Car Management
            </Link>

            {/* Show search bar only for authenticated users */}
            {isAuthenticated && (
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
                          onClick={() => handleSearchResultClick(car._id)}
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
            )}

            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                // Show Login and Register for non-authenticated users
                <>
                  <Link
                    to="/login"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Register
                  </Link>
                </>
              ) : (
                // Show Dashboard and Logout for authenticated users
                <>
                  <Link
                    to="/dashboard"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Cars</h1>
          {isAuthenticated && (
            <Link
              to="/cars/create"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Add New Car
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list ? (
            list.map(
              (car) =>
                car && ( // Check if car exists
                  <div
                    key={car._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {car && (
                      <img
                        src={car.images?.[0] || "placeholder-image-url.jpg"}
                        alt={car.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {car.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{car.description}</p>
                      <Link
                        to={`/cars/${car._id}`}
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                )
            )
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No cars available. Add some cars to get started.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
