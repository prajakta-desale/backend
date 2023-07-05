import { Router } from "express";

import userRoute from "./user/User.route";

const router = Router();

// @ts-ignore
router.use("/user", userRoute);

export default router;
