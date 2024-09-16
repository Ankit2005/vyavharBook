import { IAttendee } from './attendee-types';
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { Logger } from "winston";
import { AttendeeService } from "./attendee-service";
import mongoose from 'mongoose';
// import { IEvent } from "./event-types";

export class AttendeeController {
    constructor (private AttendeeService : AttendeeService, private logger: Logger) {}
    create = async (req: Request, res: Response, next: NextFunction) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const data = req.body as IAttendee;

        const newAttendeeId = await this.AttendeeService.create(data);

        this.logger.info(`New Event Created`, { id: newAttendeeId._id });

        res.json({
            id: newAttendeeId._id
        });
    };


    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const eventId = new mongoose.Types.ObjectId(req.params.eventId);
            const attendees = await this.AttendeeService.getAll();
            res.status(200).json({ success: true, data: attendees });
          } catch (error : any) {
            res.status(400).json({ success: false, message: error.message });
          }
    };

    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const eventId : any = new mongoose.Types.ObjectId(req.params.eventId);
            const attendees = await this.AttendeeService.findById(eventId);
            res.status(200).json({ success: true, data: attendees });
          } catch (error : any) {
            res.status(400).json({ success: false, message: error.message });
          }
    };
}
