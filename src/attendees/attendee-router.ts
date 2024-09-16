import express from "express";
import { handleErrorWrapper } from "../common/utils/handleErrorWrapper";
import { AttendeeService } from "./attendee-service";
import { AttendeeController } from "./attendee-controller";
import logger from "../config/logger";
import attendeeValidator from "./attendee-validator";
import authenticate from "../common/middlewares/authenticate";


const router = express.Router();

const attendeeService = new AttendeeService();

const attendeeController = new AttendeeController(attendeeService, logger);

router.post("/", authenticate, attendeeValidator, handleErrorWrapper(attendeeController.create));
router.get("/", authenticate, attendeeValidator, handleErrorWrapper(attendeeController.getAll));
router.get("/:eventId", authenticate, attendeeValidator, handleErrorWrapper(attendeeController.findById));

export default router;
