import { IGroup } from "./group-types";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { Logger } from "winston";
import { GroupService } from "./group-service";
import mongoose from "mongoose";
// import { IEvent } from "./event-types";

export class GroupController {
    constructor(
        private GroupService: GroupService,
        private logger: Logger,
    ) {}
    create = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const data = req.body as IGroup;

        const newGroup = await this.GroupService.create(data);

        this.logger.info(`New Group Created`, { id: newGroup._id });

        res.json({
            id: newGroup._id,
        });
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const data = req.body as IGroup;

        const newGroup = await this.GroupService.update(req, res, next);

        // this.logger.info(`New Group Created`, { id: newGroup._id });

        // res.json({
        //     id: newGroup._id,
        // });
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groups = await this.GroupService.getAll();
            res.status(200).json({ success: true, data: groups });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groupId: any = new mongoose.Types.ObjectId(
                req.params.groupId,
            );
            const group = await this.GroupService.findById(groupId);
            res.status(200).json({ success: true, data: group });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
}
