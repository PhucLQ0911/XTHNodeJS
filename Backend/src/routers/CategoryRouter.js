import express from 'express';
import { createCategory, deleteCategory, getAll, getCategoryById, updateCategory } from '../controllers/CategoryController';

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", getCategoryById);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;