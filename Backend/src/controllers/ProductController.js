import { StatusCodes } from "http-status-codes";
import Product from "../models/product";

export const create = async (req, res) => {
   try {
      let productName = req.body.name;
      productName = productName.toLowerCase();
      productName = productName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      productName = productName.replace(/[^a-z0-9 -]/g, "");
      productName = productName.replace(/\s+/g, '-');
      productName += `-${Date.now()}`;

      const product = await Product.create({
         ...req.body,
         slug: productName
      });

      return res.status(StatusCodes.CREATED).json(product);
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
   }
};

export const getAllProducts = async (req, res) => {
   try {
      const products = await Product.find();
      return res.status(StatusCodes.OK).json(products);
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
};

export const getProductById = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      if (product.length === 0) {
         return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "No one product in store!" });
      }

      return res.status(StatusCodes.OK).json(product);
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
   }
};
export const deleteProductById = async (req, res) => {
   try {
      const product = await Product.findByIdAndDelete(req.params.id);
      return res.status(StatusCodes.OK).json(product);
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
   }
};

export const updateProductById = async (req, res) => {
   try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(StatusCodes.OK).json(product);
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
   }
};


export const related = async (req, res) => {
   try {
      const product = await Product.find({
         category: req.params.categoryId,
         _id: { $ne: req.params.productId },
      });
      return res.status(StatusCodes.OK).json(product);
   } catch (error) { }
};

