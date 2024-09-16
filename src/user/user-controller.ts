import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { Logger } from "winston";
import { UserService } from "./user-service";
import { IUser } from "./user-types";

export class UserController {
    constructor (private userService: UserService, private logger: Logger) {}
    create = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const {
            username,
            firstName,
            middleName,
            lastName,
            email,
            password,
            profilePic,
            mobileNumber,
            dateOfBirth,
            address,
            role
        } = req.body as IUser;

        const newUser = await this.userService.create({
            username,
            firstName,
            middleName,
            lastName,
            email,
            password,
            profilePic,
            mobileNumber,
            dateOfBirth,
            address,
            role,
            groupsJoined: [], // Initialize as an empty array
            contributions: [] // Initialize as an empty array
        });

        this.logger.info(`New User Created`, { id: newUser._id });

        res.json({
            id: newUser._id
        });
    };
}
