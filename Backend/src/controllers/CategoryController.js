import { StatusCodes } from "http-status-codes"

export const getAll = async () => {
   try {
   } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
   }
}

export const getCategoryById = async () => {
   console.log("Get By Id");
}

export const createCategory = async () => {
   console.log("Get All");
}