import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: true,
    method: ["GET", "PUT", "DELETE", "POST"],
    credentials: true
  })
);

app.use(express.json());
app.use(authRoute);
app.use(postRoute);

app.listen(PORT, () => console.log("Server listening at port 3001"));
