import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import AuthRouter from "./routers/AuthRouter"
import Product from "./routers/ProductRouter";

const app = express();
dotenv.config();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//Connect db
connectDB(process.env.DB_URI);

//Router
app.use("/api/v1", AuthRouter);
app.use("/api/v1", Product);

export const viteNodeApp = app;