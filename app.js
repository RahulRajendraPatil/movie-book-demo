import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { logger } from "./config/logger.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("combined", { stream: logger.stream }));
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
});
