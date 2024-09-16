import { body } from "express-validator";
// import Group from "./group-model";
// import userModel from "../user/user-model";
// import mongoose from "mongoose";

export default [
    body('firstName').isString().withMessage('First name is required'),
    body('lastName').isString().withMessage('Last name is required'),
    body('villageOrCity').isString().withMessage('Village or City is required'),
    body('depositedAmount').isNumeric().withMessage('Deposited amount must be a number'),
    body('addedAmount').isNumeric().withMessage('Added amount must be a number'),
    body('mobileNumber')
      .optional()
      .isMobilePhone('any')
      .withMessage('Mobile number must be valid if provided'),
    body('event').not().isEmpty().withMessage('Event ID is required'),
];
