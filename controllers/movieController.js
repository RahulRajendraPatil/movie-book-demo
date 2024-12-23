import { db } from "../config/db.js";

// Add a movie
export const addMovie = async (req, res) => {
    const { title, description, duration, release_date } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO movies (title, description, duration, release_date) VALUES (?, ?, ?, ?)",
            [title, description, duration, release_date]
        );
        res.status(201).json({ movie_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//2. Get Available Slots

export const getAvailableSlots = async (req, res) => {
    console.log("req.query: ",req.query);
    const { movie_id, theater_id } = req.query;
    try {
        const [slots] = await db.query(
            "SELECT * FROM movie_slots WHERE movie_id = ? AND theater_id = ? AND available_seats > 0", 
            // `slot_id` ,`movie_id`, `theater_id` , `show_time`,`available_seats`
            [movie_id, theater_id]
        );
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//3. Book a Slot
export const bookSlot = async (req, res) => {
    const { slot_id, user_id, seats } = req.body;
    try {
        const [slot] = await db.query("SELECT available_seats FROM movie_slots WHERE slot_id = ?", [slot_id]);

        if (slot.length === 0 || slot[0].available_seats < seats) {
            return res.status(400).json({ error: "Not enough seats available" });
        }

        // Deduct seats
        await db.query("UPDATE movie_slots SET available_seats = available_seats - ? WHERE slot_id = ?", [seats, slot_id]);

        // Add booking
        const [result] = await db.query(
            "INSERT INTO bookings (slot_id, user_id, seats_booked) VALUES (?, ?, ?)",
            [slot_id, user_id, seats]
        );

        res.status(201).json({ booking_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
