import { Router } from "express";
import {
  allUsers,
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.get("/user/listall", allUsers);
router.post("/user/register", validateSchema(registerSchema), register);
router.post("/user/login", validateSchema(loginSchema), login);
router.get("/user/verify", verifyToken);
router.post("/user/logout", verifyToken, logout);

export default router;
