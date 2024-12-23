import {logger} from '../config/logger.js';
import { db } from "../config/db.js";

// User CRUD Operations
export const addUser = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
            [name, email, phone]
        );
        res.status(201).json({ user_id: result.insertId });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT * FROM users");
        res.status(200).json(users);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    try {
        await db.query(
            "UPDATE users SET name = ?, email = ?, phone = ? WHERE user_id = ?",
            [name, email, phone, id]
        );
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM users WHERE user_id = ?", [id]);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ error: error.message });
    }
};
