import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { Logger } from "winston";
import { EventService } from "./event-service";
import { IEvent } from "./event-types";

export class EventController {
    constructor (private EventService: EventService, private logger: Logger) {}
    create = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const data = req.body as IEvent;

        const newEvent = await this.EventService.create(data);

        this.logger.info(`New Event Created`, { id: newEvent._id });

        res.json({
            id: newEvent._id
        });
    };
}
