console.clear();
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.router";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `The server is running on http://localhost:/${process.env.SERVER_PORT} 👀`
  );
});
