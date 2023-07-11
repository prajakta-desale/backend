import express from "express";
import PostController from "../../Controllers/Post.controller";

const router = express.Router();
router.post("/create/jobs", PostController.createPost);
router.get("/jobs", PostController.getPost);
router.get("/jobs/provider/:id", PostController.postByProvider);
router.put("/jobs/edit/:id", PostController.updatePost);
router.delete("/jobs/remove/:id", PostController.removePost);
export default router;
