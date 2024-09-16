import { body } from "express-validator";
import User from "./user-model"; // Assuming your Mongoose User model is in the models folder

export default [
    body("username")
        .exists()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .custom(async (value) => {
            const user = await User.findOne({ username: value });
            if (user) {
                return Promise.reject("Username already in use");
            }
            return true;
        }),

    body("email")
        .optional() // Email is optional
        .isEmail()
        .withMessage("Please provide a valid email address")
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject("Email already in use");
            }
            return true;
        }),

    body("password")
        .exists()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("mobileNumber")
        .exists()
        .withMessage("Mobile number is required")
        .isString()
        .withMessage("Mobile number must be a string")
        .matches(/^\d{10}$/)
        .withMessage("Please provide a valid 10-digit mobile number")
        .custom(async (value) => {
            const user = await User.findOne({ mobileNumber: value });
            if (user) {
                return Promise.reject("Mobile number already in use");
            }
            return true;
        }),

    body("firstName")
        .exists()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name must be a string"),

    body("middleName")
        .exists()
        .withMessage("Middle name is required")
        .isString()
        .withMessage("Middle name must be a string"),

    body("lastName")
        .exists()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name must be a string"),

    body("dateOfBirth")
        .optional()
        .isISO8601()
        .withMessage("Please provide a valid date of birth"),

    body("address")
        .optional()
        .isString()
        .withMessage("Address must be a string"),
];
