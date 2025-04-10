import express from "express";
import {
  createPost,
  fetchPost,
  deletePost
} from "../controllers/postControllers.js";

const router = express.Router();
router.get("/posts", fetchPost);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);

export default router;
