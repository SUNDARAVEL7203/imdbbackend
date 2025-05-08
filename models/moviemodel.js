import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    plot: { type: String, required: true },
    producerId: { type: mongoose.Schema.Types.ObjectId, ref: "Producer", required: true },
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: "Actor", required: true },
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);