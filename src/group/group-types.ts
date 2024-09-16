import { Schema } from 'mongoose';


export interface IGroup  {
  groupName: string;
  event: Schema.Types.ObjectId; // Event ID reference
  members: Schema.Types.ObjectId[]; // Array of attendee IDs
}