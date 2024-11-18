import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  images: [{ type: String }], // Store image URLs
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
const Car = mongoose.model("Car", carSchema);

export default Car;
