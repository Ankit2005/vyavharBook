
import validateRefreshToken from "../common/middlewares/validateRefreshToken";
import { handleErrorWrapper } from "../common/utils/handleErrorWrapper";
import logger from "../config/logger";

import { AuthController } from "./auth-controller";
import express from "express";

const router = express.Router();

const authController = new AuthController(logger);

router.post("/login", handleErrorWrapper(authController.login));
router.post("/refresh", validateRefreshToken, handleErrorWrapper(authController.refresh));



export default router;
