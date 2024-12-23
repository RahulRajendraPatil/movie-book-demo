import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port:3306,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const db = pool.promise();