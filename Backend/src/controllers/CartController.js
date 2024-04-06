import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";

export const getProductInCartByUser = async (req, res) => {
   try {
      const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
      const cartData = {
         products: cart.products.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            discount: item.productId.discount,
            price: item.productId.price,
            quantity: item.quantity
         }))
      };

      return res.status(200).json({ products: cartData.products });
   } catch (error) {
      return res.status(500).json(error);
   }
};


export const addItemToCart = async (req, res) => {

   try {
      const { userId, productId, quantity } = req.body;
      //Kiem tra gio hang ton tai chua theo userId
      let cart = await Cart.findOne({ userId });

      //Neu gio hang khong ton tai thi tao moi
      if (!cart) {
         cart = new Cart({ userId, products: [] });
      }

      //Kiem tra san pham
      const exitsProductIndex = cart.products.findIndex(item => item.productId.toString() == productId);

      if (exitsProductIndex != -1) {
         //Neu ton tai thi tang so luong
         cart.products[exitsProductIndex].quantity += quantity;
      }
      else {
         //Them id san pham moi vao
         cart.products.push({ productId, quantity });
      }

      //Luu gio hang
      await cart.save();
      return res.status(201).json(cart);

   } catch (error) {
      return res.status(500).json(error);
   }
};

// export const removeFromCart = async (req, res) => {
//    const { userId, productId } = req.body;
//    try {
//       let cart = await Cart.findOne({ userId });
//       if (!cart) {
//          return res.status(400).json({ error: "Not found product!" });
//       }

//       cart.products = cart.products.filter((product) => product.productId.toString() != productId);

//       await cart.save();

//       return res.status(200).json({ message: "Delete product success!" });
//    } catch (error) {
//       return res.status(500).json(error);
//    }
// }


// Xóa sản phẩm trong giỏ hàng thuộc 1 user

export const removeFromCart = async (req, res) => {
   const { userId, productId } = req.body;
   try {
      let cart = await Cart.findOne({ userId });
      console.log(cart);
      if (!cart) {
         return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
      }
      cart.products = cart.products.filter(
         (product) => product.productId && product.productId.toString() !== productId
      );

      await cart.save();
      return res.status(StatusCodes.OK).json({ cart });
   } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
   }
};

// Cập nhật số lượng
export const updateProductQuantity = async (req, res) => {
   const { userId, productId, quantity } = req.body;
   try {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
         return res.status(StatusCodes.NOT_FOUND).json({ error: "Cart not found" });
      }

      const product = cart.products.find((item) => item.productId.toString() === productId);
      if (!product) {
         return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
      }
      product.quantity = quantity;
      await cart.save();
      return res.status(StatusCodes.OK).json({ cart });
   } catch (error) { }
};

// Tăng số lượng của sản phẩm trong giỏ hàng
export const increaseProductQuantity = async (req, res) => {
   const { userId, productId } = req.body;
   try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
         return res.status(404).json({ message: "Cart not found" });
      }

      const product = cart.products.find((item) => item.productId.toString() === productId);
      if (!product) {
         return res.status(404).json({ message: "Product not found in cart" });
      }

      product.quantity++;

      await cart.save();
      res.status(200).json(cart);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Giảm số lượng của sản phẩm trong giỏ hàng
export const decreaseProductQuantity = async (req, res) => {
   const { userId, productId } = req.body;
   try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
         return res.status(404).json({ message: "Cart not found" });
      }

      const product = cart.products.find((item) => item.productId.toString() === productId);
      if (!product) {
         return res.status(404).json({ message: "Product not found in cart" });
      }

      if (product.quantity > 1) {
         product.quantity--;
      }

      await cart.save();
      res.status(200).json(cart);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};