import { Movie } from "../models/moviemodel.js";
import { Actor } from "../models/actormodel.js";
import { Producer } from "../models/producermodel.js";

export const createMovie = async (req, res) => {
  try {
    const { name, year, plot, producerId, actorId } = req.body;

    if (!name || !year || !plot || !producerId || !actorId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const producer = await Producer.findById(producerId);
    if (!producer) {
      return res.status(404).json({ message: "Producer not found" });
    }

    const actor = await Actor.findById(actorId);
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }

    const movie = new Movie({ name, year, plot, producerId, actorId });
    await movie.save();

    return res.status(201).json({ message: "Movie created successfully", movie });

  } catch (err) {
    return res.status(500).json({ message: "Movie creation failed", error: err.message });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    

    res.json({ movies });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete movie" });
  }
};
