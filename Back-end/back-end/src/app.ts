import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import genreRoutes from "./routes/genreRoutes";
import assessmentRoutes from "./routes/assessmentRoutes";
import devRoutes from "./routes/devRoutes";
import loginRoutes from "./routes/loginRoutes";
import "./models/associations";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.use("/games", gameRoutes);

app.use("/genres", genreRoutes);

app.use("/assessments", assessmentRoutes);

app.use("/developers", devRoutes);

app.use("/login", loginRoutes);

export default app;