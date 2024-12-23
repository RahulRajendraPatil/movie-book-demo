import {logger} from '../config/logger.js';
import { db } from "../config/db.js";
export const addMovie = async (req, res) => {
    const { title, description, duration, release_date } = req.body;
    try {
      const [result] = await db.query(
        "INSERT INTO movies (title, description, duration, release_date) VALUES (?, ?, ?, ?)",
        [title, description, duration, release_date]
      );
      res.status(201).json({ movie_id: result.insertId });
      logger.info(`Movie added: ${title}`);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getAvailableSlots = async (req, res) => {
    const { movie_id, theater_id } = req.query;
    try {
      const [slots] = await db.query(
        "SELECT * FROM movie_slots WHERE movie_id = ? AND theater_id = ? AND available_seats > 0",
        [movie_id, theater_id]
      );
      res.status(200).json(slots);
      logger.info(`Fetched slots for movie ID: ${movie_id}, theater ID: ${theater_id}`);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const bookSlot = async (req, res) => {
    const { slot_id, user_id, seats } = req.body;
    try {
      const [slot] = await db.query("SELECT available_seats FROM movie_slots WHERE slot_id = ?", [slot_id]);
      if (slot.length === 0 || slot[0].available_seats < seats) {
        return res.status(400).json({ error: "Not enough seats available" });
      }
      await db.query("UPDATE movie_slots SET available_seats = available_seats - ? WHERE slot_id = ?", [seats, slot_id]);
      const [result] = await db.query(
        "INSERT INTO bookings (slot_id, user_id, seats_booked) VALUES (?, ?, ?)",
        [slot_id, user_id, seats]
      );
      res.status(201).json({ booking_id: result.insertId });
      logger.info(`Slot booked: ${result.insertId}`);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { seats } = req.body;
    try {
      await db.query("UPDATE bookings SET seats_booked = ? WHERE booking_id = ?", [seats, id]);
      res.status(200).json({ message: "Booking updated successfully" });
      logger.info(`Booking updated: ${id}`);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
      await db.query("DELETE FROM bookings WHERE booking_id = ?", [id]);
      res.status(200).json({ message: "Booking deleted successfully" });
      logger.info(`Booking deleted: ${id}`);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  };
  