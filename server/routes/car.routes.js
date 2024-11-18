import express from "express";
import {
  addCar,
  getAllCarsOwned,
  searchCars,
  getCarById,
  updateCar,
  deleteCar,
  getAllCars,
} from "../controllers/car.controller.js";
import { upload } from "../utils/multer.js";
import verifyUser from "../middlewares/auth.js";

const router = express.Router();

// Protect the routes to make sure the user is authenticated

// Route to add a car (with image upload)
router.post("/add", verifyUser, upload.array("images", 10), addCar);

// Route to get all cars for the logged-in user
router.get("/", verifyUser, getAllCarsOwned);
router.get("/getAllCars", getAllCars);

// Route to search cars
router.get("/search", verifyUser, searchCars);

// Route to get a particular car by its ID
router.get("/:id", verifyUser, getCarById);

// Route to update a car
router.put("/update/:id", verifyUser, upload.array("images", 10), updateCar);

// Route to delete a car
router.delete("/delete/:id", verifyUser, deleteCar);

export default router;
