import { Router } from "express";
import { addItemToCart, getProductInCartByUser, removeFromCart } from "../controllers/CartController";

const router = Router();
router.post("/cart/add", addItemToCart);
router.get("/cart/:id", getProductInCartByUser);
router.delete("/cart/remove", removeFromCart);
export default router;