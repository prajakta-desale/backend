import { Router } from "express";

import userRoute from "./user/User.route";
import postRoute from "./post/Post.route";

const router = Router();

// @ts-ignore
router.use("/user", userRoute);
router.use("/post", postRoute);

export default router;
