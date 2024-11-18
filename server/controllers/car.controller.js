import fs from "fs";
import Car from "../models/car.model.js";
import uploadImageToCloudinary from "../utils/ImageUpload.js"; // Import your Cloudinary upload function
import cloudinary from "cloudinary";
// Add a new car
export const addCar = async (req, res) => {
  try {
    console.log(" req.body in addCar", req.body);
    const { title, description, tags } = req.body;
    console.log("req.files", req.files);
    const imageFiles = req.files || [];
    const imageUrls = [];

    for (const file of imageFiles) {
      // Upload image to Cloudinary and remove it from the local file system
      const cloudinaryResponse = await uploadImageToCloudinary(
        file.path, // file path from Multer upload
        "car-images", // Cloudinary folder
        800, // Example width
        600, // Example height
        "auto", // Gravity
        "fill" // Crop type
      );

      // Add the image URL to the imageUrls array
      imageUrls.push(cloudinaryResponse.secure_url);

      // Remove the file from the local file system after uploading to Cloudinary
      fs.unlinkSync(file.path); // This deletes the file from local storage
    }

    // Create a new car entry in the database
    const car = new Car({
      title,
      description,
      tags: tags ? tags.split(",") : [], // Convert tags from string to array
      images: imageUrls,
      owner: req.user.id,
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cars owned by the logged-in user
export const getAllCarsOwned = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id });

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search cars based on title, description, or tags
export const searchCars = async (req, res) => {
  try {
    console.log("req.query", req.query);
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Search keyword is required" });
    }

    const cars = await Car.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ],
      owner: req.user.id,
    });
    console.log("cars",cars)
    if (cars.length === 0) {
      return res
        .status(404)
        .json({ message: "No cars found matching the search criteria" });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a particular car by ID
export const getCarById = async (req, res) => {
  console.log("req.params", req.params);
  console.log("req.user", req.user);
  try {
    const car = await Car.findOne({ _id: req.params.id, owner: req.user.id });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCar = async (req, res) => {
  console.log("req.params in updateCar", req.params);
  console.log("req.user in updateCar", req.user);
  try {
    const car = await Car.findOne({ _id: req.params.id, owner: req.user.id });
    console.log("car", car);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    const { title, description, tags } = req.body;
    console.log("req.files", req.files);
    const imageFiles = req.files || [];
    const imageUrls = [];

    for (const file of imageFiles) {
      const cloudinaryResponse = await uploadImageToCloudinary(
        file.path,
        "car-images",
        800,
        600,
        "auto",
        "fill"
      );
      imageUrls.push(cloudinaryResponse.secure_url);
      fs.unlinkSync(file.path); // Remove the file locally after upload
    }

    // Prepare the updated fields
    const updates = {
      ...(title && { title }),
      ...(description && { description }),
      ...(tags && { tags: tags.split(",") }),
      ...(imageUrls.length > 0 && { images: [...car.images, ...imageUrls] }), // Append new images to existing ones
    };

    // Update the car in the database
    const updatedCar = await Car.findByIdAndUpdate(car._id, updates, {
      new: true,
    });

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, owner: req.user.id });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Remove images from Cloudinary
    for (const image of car.images) {
      const publicId = image.split("/").pop().split(".")[0];
      await cloudinary.v2.uploader.destroy(publicId);
    }

    // Delete the car from the database
    await car.deleteOne();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
