import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import actorRoutes from "./routes/actorRoutes.js";
import producerRoutes from "./routes/producerRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "I am from backend server",
        success: true
    });
});
app.use(cors());

// ✅ Middleware that must come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", userRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/producers", producerRoutes);
app.use("/api/movies", movieRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
