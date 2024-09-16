import { Schema } from "mongoose";


export interface IAttendee  {
    firstName: string;
    middleName?: string;
    lastName: string;
    villageOrCity: string;
    depositedAmount: number;
    addedAmount: number;
    gift?: string; // Nullable
    mobileNumber?: string; // Optional
    event: Schema.Types.ObjectId; // Event ID reference
  }