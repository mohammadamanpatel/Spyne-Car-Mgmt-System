import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCar } from "../features/carSlice";
import { createCar } from "../api/carApi";

const AddCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    imageUrls: [],
  });
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        owner: user._id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const currentImageCount = formData.imageUrls.length;
    const totalImages = currentImageCount + files.length;

    if (totalImages > 10) {
      setImageError("You can only upload a maximum of 10 images");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter((file) => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setImageError("Some files are too large. Maximum size is 5MB per image.");
      return;
    }

    setImageError("");
    setFormData({
      ...formData,
      imageUrls: [...formData.imageUrls, ...files].slice(0, 10),
    });
  };

  const removeImage = (index) => {
    const updatedImages = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imageUrls: updatedImages,
    });
    setImageError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length === 0) {
      setImageError("Please upload at least one image");
      return;
    }

    const formDataObj = new FormData();
    formData.imageUrls.forEach((file) => {
      formDataObj.append("images", file);
    });

    Object.keys(formData).forEach((key) => {
      if (key !== "imageUrls") {
        formDataObj.append(key, formData[key]);
      }
    });

    try {
      const response = await createCar(formDataObj, token);
      if (response.error) {
        console.error(response.error);
        return;
      }
      dispatch(addCar(response));
      navigate("/");
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-gray-800 shadow-lg flex flex-col gap-8 lg:flex-row">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center lg:text-left text-white">
          Add New Car
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="p-3 border border-gray-600 rounded bg-gray-700 text-white w-full"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Car Title"
            required
          />
          <textarea
            className="p-3 border border-gray-600 rounded bg-gray-700 text-white w-full min-h-[150px]"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Car Description"
            required
          />
          <input
            className="p-3 border border-gray-600 rounded bg-gray-700 text-white w-full"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
          />
        </form>
      </div>
      <div className="flex-1">
        <div className="max-w-sm mx-auto">
          <div className="mb-4 text-white text-center">
            <p>{formData.imageUrls.length}/10 images uploaded</p>
          </div>
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
            className={`block w-full ${
              formData.imageUrls.length >= 10
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            } text-white rounded-lg p-3 text-center mt-4`}
          >
            {formData.imageUrls.length >= 10
              ? "Maximum Images Reached"
              : "Upload Images"}
          </label>
          {imageError && (
            <p className="text-red-500 text-sm mt-2">{imageError}</p>
          )}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {formData.imageUrls.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  onClick={() => removeImage(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-green-500 text-white rounded-lg p-3 font-semibold hover:bg-green-600"
            type="submit"
          >
            Add Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
