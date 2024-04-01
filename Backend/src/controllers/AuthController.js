import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const signupSchema = Joi.object({
   email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email is not null",
      "string.email": "Email is illegal"
   }),
   password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.empty": "Password is not null",
      "string.min": "Password is greater than 6 character"
   }),
   confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
      "any.required": "Confirm password is required",
      "any.only": "Confirm password is not match password"
   }),
   name: Joi.string().min(3).max(30).required().messages({
      "any.required": "Password is required",
      "string.empty": "Password is not null",
      "string.min": "Password is greater than 3 character",
      "string.max": "Password is less than 30 character"
   }),
   avatar: Joi.string().uri().messages({
      "string.uri": "Avatar is valid path"
   }),
});

const signinSchema = Joi.object({
   email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email is not null",
      "string.email": "Email is illegal"
   }),
   password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.empty": "Password is not null",
      "string.min": "Password is greater than 6 character"
   }),
})

export const signup = async (req, res) => {
   try {
      const { email, password } = req.body;
      const { error } = signupSchema.validate(req.body);
      if (error) {
         const message = error.details.map(item => item.message);
         return res.status(StatusCodes.BAD_REQUEST).json({ message });
      }

      const exitsUser = await User.findOne({ email });
      if (exitsUser) {
         return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is exits" });
      }

      const hashPassword = await bcryptjs.hash(password, 10);
      const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
      const user = await User.create({
         ...req.body,
         password: hashPassword,
         role
      })

      return res.status(StatusCodes.CREATED).json({ message: "Create user success", user })
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message })
   }

};

export const signin = async (req, res) => {
   try {
      const { email, password } = req.body;
      const { error } = signinSchema.validate(req.body);
      if (error) {
         const message = error.details.map(item => item.message);
         return res.status(StatusCodes.BAD_REQUEST).json({ message });
      }

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is invalid." });
      }

      const isMatchPassword = await bcryptjs.compare(password, user.password);
      if (!isMatchPassword) {
         return res.status(StatusCodes.BAD_REQUEST).json({ message: "Password is wrong." });
      }

      const token = await jwt.sign({ userId: user._id }, "123456", { expiresIn: "30m" });

      user.password = undefined;
      return res.status(StatusCodes.OK).json({ message: "Login success!", token, user });
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
   }
};