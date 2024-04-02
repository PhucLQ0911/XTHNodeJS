import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db";
import AuthRouter from "./routers/AuthRouter"
import ProductRouter from "./routers/ProductRouter";
import CategoryRouter from "./routers/CategoryRouter";
import CartRouter from "./routers/CartRouter";

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
app.use("/api/v1", ProductRouter);
app.use("/api/v1", CategoryRouter);
app.use("/api/v1", CartRouter);

export const viteNodeApp = app;