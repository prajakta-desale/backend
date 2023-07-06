import userController from "../../Controllers/User.controller";
import path from "path";
import express from "express";
import { celebrate } from "celebrate";
import UserSchema from "../../Constants/Schema/User.schema";
const router = express.Router();
router.post(
  "/sign-in",
  // celebrate(UserSchema.login),
  userController.login
);
router.post(
  "/register",
  // celebrate(UserSchema.register),
  userController.register
);
export default router;
