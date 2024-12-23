import express from "express";
import { addMovie, getAvailableSlots, bookSlot, updateBooking, deleteBooking } from "../controllers/movieController.js";
import { addTheater, getTheaters, updateTheater, deleteTheater } from "../controllers/theaterController.js";
import { addUser, getUsers, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Movie routes
router.post("/movies", addMovie);
router.get("/slots", getAvailableSlots);
router.post("/bookings", bookSlot);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

// Theater routes
router.post("/theaters", addTheater);
router.get("/theaters", getTheaters);
router.put("/theaters/:id", updateTheater);
router.delete("/theaters/:id", deleteTheater);

// User routes
router.post("/users", addUser);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
