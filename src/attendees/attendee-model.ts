import mongoose, { Schema } from "mongoose";
import { IAttendee } from "./attendee-types";

const AttendeeSchema = new Schema<IAttendee>({
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    villageOrCity: {
      type: String,
      required: true,
    },
    depositedAmount: {
      type: Number,
      required: true,
    },
    addedAmount: {
      type: Number,
      required: true,
    },
    gift: {
      type: String,
    },
    mobileNumber: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^[0-9]{10}$/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid phone number!`,
      },
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  });
  

export default mongoose.model<IAttendee>("Attendee", AttendeeSchema);
