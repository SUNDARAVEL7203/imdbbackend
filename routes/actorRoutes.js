import express from "express";
import {
  createActor,
  getAllActors,
  updateActor,
  deleteActor,
} from "../controllers/actorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createActor", protect, createActor);
router.get("/getAllActors", getAllActors);
router.put("/:id/updateActor", protect, updateActor);
router.delete("/:id/deleteActor", protect, deleteActor);

export default router;
