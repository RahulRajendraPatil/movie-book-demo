import {logger} from '../config/logger.js';
import { db } from "../config/db.js";

// Theater CRUD Operations
export const addTheater = async (req, res) => {
    const { name, location } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO theaters (name, location) VALUES (?, ?)",
            [name, location]
        );
        logger.info(`Theater detail added: ${result.insertId}`);
        res.status(201).json({ theater_id: result.insertId });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getTheaters = async (req, res) => {
    try {
        const [theaters] = await db.query("SELECT * FROM theaters");
        logger.info(`Fetched all theaters`);
        res.status(200).json(theaters);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateTheater = async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    try {
        await db.query(
            "UPDATE theaters SET name = ?, location = ? WHERE theater_id = ?",
            [name, location, id]
        );
        logger.info(`Theater updated: ${id}`);
        res.status(200).json({ message: "Theater updated successfully" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteTheater = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM theaters WHERE theater_id = ?", [id]);
        logger.info(`Theater deleted: ${id}`);
        res.status(200).json({ message: "Theater deleted successfully" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};
