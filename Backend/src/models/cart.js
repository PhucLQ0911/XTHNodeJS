import mongoose, { Schema } from "mongoose";

const cartScheme = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
   },

   products: [
      {
         productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
         },
         quantity: {
            type: Number,
            required: true,
            min: 0
         }
      }
   ]
}, { versionKey: false, timestamps: true });

export default mongoose.model("Cart", cartScheme);
