import express from "express";

import { signup, login, Logout } from "../controller/userController.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../validations/userValidation.js";
const router = express.Router();

router.post("/signup", validate(signupSchema), signup);

router.post("/login", validate(loginSchema), login);
router.post("/logout", Logout);

export default router;
