import express from "express";
import { UserController } from "./user-controller";
import userValidator from "./user-validator";
import { UserService } from "./user-service";
import logger from "../config/logger";
import { handleErrorWrapper } from "../common/utils/handleErrorWrapper";
// import authenticate from "../common/middlewares/authenticate";
// import { canAccess } from "../common/middlewares/canAccess";
// import { Roles } from "../common/constants";

const router = express.Router();

const userService = new UserService();

const userController = new UserController(userService, logger);

router.post(
    "/",
    // authenticate,
    // canAccess([Roles.ADMIN]),
    userValidator,
    handleErrorWrapper(userController.create),
);

// router.get("/", handleErrorWrapper(categoryController.getAll));
// router.get("/:categoryId", handleErrorWrapper(categoryController.getOne));

export default router;
