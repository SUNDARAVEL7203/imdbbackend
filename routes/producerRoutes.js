import express from "express";
import {
  createProducer,
  getAllProducers,
  updateProducer,
  deleteProducer,
} from "../controllers/producerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createProducer", protect, createProducer);
router.get("/getAllProducers", getAllProducers);
router.put("/:id/updateProducer", protect, updateProducer);
router.delete("/:id/deleteProducer", protect, deleteProducer);

export default router;
