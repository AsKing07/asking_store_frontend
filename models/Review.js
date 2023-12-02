import { model, models, Schema } from "mongoose";

const reviewSchema = new Schema({
  title: String,
  description: String,
  stars: Number,
  product: { type: Schema.Types.ObjectId },
  user: Object, // Ajout du champ user
}, { timestamps: true });

export const Review = models?.Review || model('Review', reviewSchema);
