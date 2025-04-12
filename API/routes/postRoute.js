import express from "express";
import {
  createPost,
  getPost,
  editPost,
  deletePost
} from "../controllers/postControllers.js";

const router = express.Router();
router.get("/posts", getPost);
router.post("/posts", createPost);
router.put("/posts/:id", editPost);
router.delete("/posts/:id", deletePost);

export default router;
