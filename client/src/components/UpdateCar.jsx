import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCar } from "../features/carSlice";
import { fetchCarById, updateCar as updateCarApi } from "../api/carApi";

const UpdateCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: carId } = useParams(); // Get the car ID from URL params
  const { token } = useSelector((state) => state.auth); // Access token from Redux store
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    imageUrls: [],
  });
  const [imageError, setImageError] = useState("");

  // Fetch car details when the component mounts
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetchCarById(carId, token); // Fetch car details from API
        if (response.error) {
          console.error(response.error);
        } else {
          setFormData({
            title: response.title,
            description: response.description,
            tags: response.tags.join(", "), // Assuming tags are an array
            imageUrls: response.imageUrls || [], // Existing images
          });
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [carId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      setImageError("You can only upload a maximum of 10 images.");
      return;
    }
    setImageError("");
    setFormData({
      ...formData,
      imageUrls: files, // Update image files
    });
  };

  const removeImage = (index) => {
    const updatedImages = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imageUrls: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "imageUrls") {
        formData[key].forEach((file) => updatedFormData.append("images", file)); // Backend expects "images"
      } else {
        updatedFormData.append(key, formData[key]);
      }
    });

    try {
      const response = await updateCarApi(carId, updatedFormData, token); // API call to update car
      console.log("response",response)
      if (response.error) {
        console.error(response.error);
        alert(response.error); // Inform the user of errors
        return;
      }
      alert("Car updated successfully!");
      dispatch(updateCar(response)); // Update Redux state with updated car
      navigate("/dashboard"); // Navigate back to the profile page
    } catch (error) {
      console.error("Error updating car:", error);
      alert("There was an error updating the car.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-gray-800 shadow-lg flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center lg:text-left text-white">
          Update Car
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-3 border border-gray-600 rounded bg-gray-700 text-white"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Car Title"
            required
          />
          <textarea
            className="p-3 border border-gray-600 rounded bg-gray-700 text-white"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Car Description"
            required
          />
          <input
            className="p-3 border border-gray-600 rounded bg-gray-700 text-white"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
          />
          <button
            className="w-full mt-6 bg-green-500 text-white rounded-lg p-3 font-semibold hover:bg-green-600"
            type="submit"
          >
            Update Car
          </button>
        </form>
      </div>

      <div className="flex-1">
        <div className="max-w-sm mx-auto">
          <input
            className="hidden"
            type="file"
            name="imageUrls"
            id="imageUpload"
            onChange={handleImageChange}
            multiple
            accept=".jpg, .png, .jpeg"
          />
          <label
            htmlFor="imageUpload"
            className="block w-full bg-blue-500 text-white rounded-lg p-3 text-center cursor-pointer hover:bg-blue-600 mt-4"
          >
            Upload Images
          </label>
          {imageError && (
            <p className="text-red-500 text-sm mt-2">{imageError}</p>
          )}
          <div className="flex flex-col gap-2 mt-4">
            {formData.imageUrls.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image instanceof File ? URL.createObjectURL(image) : image} // Handle both new and existing images
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  className="absolute top-0 right-0 text-red-500 p-1"
                  onClick={() => removeImage(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCar;
