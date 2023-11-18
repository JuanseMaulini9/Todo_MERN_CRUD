import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import tasks from "./routes/tasks.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", tasks);

export default app;
