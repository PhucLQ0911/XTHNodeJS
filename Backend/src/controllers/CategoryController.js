import { StatusCodes } from "http-status-codes"
import Category from "../models/category";
import Product from "../models/product";

export const getAll = async (req, res) => {
   try {
      const categories = await Category.find();
      return res.status(StatusCodes.OK).json({ categories });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
   }
}

export const getCategoryById = async (req, res) => {
   try {
      const products = await Product.find({ category: req.params.id });
      const category = await Category.findOne({ _id: req.params.id });
      return res.status(StatusCodes.OK).json({ category, products });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
   }
}

export const createCategory = async (req, res) => {
   try {
      const { name } = req.body;
      const exitsName = await Category.findOne({ name });
      if (exitsName) {
         return res.status(StatusCodes.BAD_REQUEST).json({ message: "Category already exists" });
      }

      const category = await Category.create({ name });
      return res.status(StatusCodes.CREATED).json({ category });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
   }
}

export const updateCategory = async (req, res) => {
   try {
      const { name } = req.body;

      const exitsName = await Category.findOne({ name });

      if (exitsName) {
         return res.status(StatusCodes.BAD_REQUEST).json({ message: "Category already exists" });
      }
      const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      return res.status(StatusCodes.OK).json({ category });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
   }
}

export const deleteCategory = async (req, res) => {
   try {
      const products = await Product.find({ category: req.params.id });
      if (products.length > 0) {
         return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please delete all products with a relationship" });
      }

      const category = await Category.findOneAndDelete({ _id: req.params.id });
      return res.status(StatusCodes.OK).json({ message: "Category deleted!", category });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
   }
}