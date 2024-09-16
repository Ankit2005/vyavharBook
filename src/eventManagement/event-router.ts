import express from "express";
import { handleErrorWrapper } from "../common/utils/handleErrorWrapper";
import { EventService } from "./event-service";
import { EventController } from "./event-controller";
import logger from "../config/logger";
import eventValidator from "./event-validator";
import authenticate from "../common/middlewares/authenticate";


const router = express.Router();

const userService = new EventService();

const eventController = new EventController(userService, logger);

router.post("/", authenticate, eventValidator, handleErrorWrapper(eventController.create));

export default router;
