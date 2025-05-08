import express from "express";
import {
  createMovie,
  getAllMovies,
  deleteMovie,
} from "../controllers/movieController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/createMovie", protect,  createMovie);
router.get("/getAllMovies", getAllMovies);
router.delete("/:id/deleteMovies", protect, deleteMovie);

export default router;
