import express from 'express';
import { createCategory, getAll } from '../controllers/CategoryController';

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", getAll);

router.post("/categories", createCategory);
export default router;