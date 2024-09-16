import express from "express";
import { handleErrorWrapper } from "../common/utils/handleErrorWrapper";
import { GroupController } from "./group-controller";
import { GroupService } from "./group-service";
import logger from "../config/logger";
import groupValidators from "./group-validator";
import authenticate from "../common/middlewares/authenticate";


const router = express.Router();

const groupService = new GroupService();

const groupController = new GroupController(groupService, logger);

router.post("/", authenticate, groupValidators, handleErrorWrapper(groupController.create));
router.put("/:groupId", authenticate, groupValidators, handleErrorWrapper(groupController.update));
router.get("/", authenticate, handleErrorWrapper(groupController.getAll));
router.get("/:groupId", authenticate, handleErrorWrapper(groupController.getById));
// router.get("/:eventId", authenticate, attendeeValidator, handleErrorWrapper(attendeeController.findById));

// router.get('/groups', getGroups);
// router.post('/groups', createGroup);
// router.get('/groups/:id', getGroupById);
// router.put('/groups/:id', updateGroup);
// router.delete('/groups/:id', deleteGroup);

export default router;
