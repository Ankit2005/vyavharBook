import { body } from "express-validator";
// import Group from "./group-model";
import userModel from "../user/user-model";
import mongoose from "mongoose";

export default [
    body("eventName")
        .exists()
        .withMessage("Event name is required")
        .isString()
        .withMessage("Event name must be a string")
        .isLength({ min: 3 })
        .withMessage("Event name must be at least 3 characters long")
        .isLength({ max: 100 })
        .withMessage("Event name cannot exceed 100 characters"),

    body("eventDate")
        .exists()
        .withMessage("Event date is required")
        .isISO8601()
        .withMessage("Event date must be a valid date")
        .custom(value => {
            const date = new Date(value);
            if (date <= new Date()) {
                throw new Error("Event date must be in the future");
            }
            return true;
        }),

    body("organizer")
        .exists()
        .withMessage("Organizer is required")
        .isMongoId()
        .withMessage("Organizer must be a valid user id")
        .custom(async (value) => {
            const user = await userModel.findById(value);
            if (!user) {
                return Promise.reject("Organizer must be a valid user");
            }
            return true;
        }),

    body("attendees")
        .optional()
        .isArray()
        .withMessage("Attendees must be an array if provided")
        .custom(async (values) => {
            if (values) {
                for (const value of values) {
                    if (!mongoose.Types.ObjectId.isValid(value)) {
                        throw new Error("Each attendee must be a valid MongoDB ObjectId");
                    }
                    const user = await userModel.findById(value);
                    if (!user) {
                        throw new Error("Each attendee must be a valid user");
                    }
                }
            }
            return true;
        }),

    body("groups")
        .optional()
        .isArray()
        .withMessage("Groups must be an array if provided")
        // .custom(async (values) => {
        //     if (values) {
        //         for (const value of values) {
        //             if (!mongoose.Types.ObjectId.isValid(value)) {
        //                 throw new Error("Each group must be a valid MongoDB ObjectId");
        //             }
        //             const group = await Group.findById(value);
        //             if (!group) {
        //                 throw new Error("Each group must be a valid group");
        //             }
        //         }
        //     }
        //     return true;
        // })
];
