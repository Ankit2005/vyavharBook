import attendeeModel from "./attendee-model";
import createHttpError from "http-errors";
import { IAttendee } from "./attendee-types";
import mongoose from "mongoose";

export class AttendeeService {
    async create({
        firstName,
        middleName,
        lastName,
        villageOrCity,
        depositedAmount,
        addedAmount,
        gift,
        mobileNumber,
        event,
    }: IAttendee) {
        try {
            return await attendeeModel.create({
                firstName,
                middleName,
                lastName,
                villageOrCity,
                depositedAmount,
                addedAmount,
                gift,
                mobileNumber,
                event,
            });
        } catch (err: any) {
            const errMsg: any =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                err?.message || "Failed to store the data in the database";
            const error = createHttpError(500, errMsg);
            throw error;
        }
    };

    async getAll (){
        try {
            return await attendeeModel.find();
        } catch (err: any) {
            const errMsg: any =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                err?.message || "Failed to retrieve data from the database";
            const error = createHttpError(500, errMsg);
            throw error;
        }
    }

    async findById (eventId : string){
        try {
            return await attendeeModel.find({ event : eventId})
        } catch (err: any) {
            const errMsg: any =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                err?.message || "Failed to retrieve data from the database";
            const error = createHttpError(500, errMsg);
            throw error;
        }
    }

  

    


}
