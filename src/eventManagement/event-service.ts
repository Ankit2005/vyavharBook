import eventModel from "./event-model";
import createHttpError from "http-errors";
import { IEvent } from "./event-types";

export class EventService {
    async create({
        eventName,
        eventDate,
        organizer,
        attendees,
        groups,
    }: IEvent) {
        try {
            return await eventModel.create({
                eventName,
                eventDate,
                organizer,
                attendees,
                groups,
            });
        } catch (err: any) {
            const errMsg: any =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                err?.message || "Failed to store the data in the database";
            const error = createHttpError(500, errMsg);
            throw error;
        }
    }
}
