import { Router } from "express";
import UserControllers from "../controllers/user.controllers";
import { IsLoggedMiddleware } from "../../middlewares/jwt.auth.middleware";
const router = Router();
const userController = new UserControllers();

router.post("/user/login", userController.LoginHandler);
router.post("/user/register", userController.RegisterHandler);
router.post("/user/logout", userController.LogoutHandler);
export default router;
