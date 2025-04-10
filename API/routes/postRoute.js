import express from "express";
import {
  createPost,
  getPost,
  deletePost
} from "../controllers/postControllers.js";

const router = express.Router();
router.get("/posts", getPost);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);

export default router;
