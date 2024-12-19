import express from "express";
import { initializeDatabase } from "./src/config/initializeDatabase.js";
import registerUserRouter from "./src/routes/Users/Register.js";
import loginUserRouter from "./src/routes/Users/Login.js";
import addTaskRouter from "./src/routes/Tasks/AddTask.js";
import showTaskRouter from "./src/routes/Tasks/ShowTask.js"

import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;
const urlFormat = "/api/v1/";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(`${urlFormat}register`, registerUserRouter);
app.use(`${urlFormat}login`, loginUserRouter);
app.use(`${urlFormat}addTask`, addTaskRouter);
app.use(`${urlFormat}showTask`, showTaskRouter);


(async () => {
  try {
    await initializeDatabase();
    console.log("Database initialized successfully.");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
})();
