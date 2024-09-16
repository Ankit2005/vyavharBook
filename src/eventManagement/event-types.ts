import { IUser } from "../user/user-types";

interface IGroup {
    _id: any; // Assuming the ID type, replace with the actual type if needed
}

export interface IEvent {
    eventName: string;
    eventDate: Date;
    organizer: IUser['_id']; // Reference to the user organizing the event
    attendees: IUser['_id'][]; // List of attendees
    groups: IGroup['_id'][]; // List of groups associated with the event
  }