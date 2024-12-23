import express from "express";
import { addMovie, getAvailableSlots, bookSlot } from "../controllers/movieController.js";

const router = express.Router();

router.post("/movies", addMovie);
router.get("/slots", getAvailableSlots);
router.post("/bookings", bookSlot);

export default router;