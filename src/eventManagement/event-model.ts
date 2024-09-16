import mongoose, { Document, Schema } from "mongoose";
import { IEvent } from "./event-types";

const eventSchema = new Schema<IEvent>(
    {
        eventName: {
            type: String,
            required: [true, "Event name is required"],
            trim: true,
            minlength: [3, "Event name must be at least 3 characters long"],
            maxlength: [100, "Event name cannot exceed 100 characters"],
        },
        eventDate: {
            type: Date,
            required: [true, "Event date is required"],
            validate: {
                validator: function (v: Date) {
                    return v > new Date(); // Event date must be in the future
                },
                message: "Event date must be in the future",
            },
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Organizer is required"],
        },
        attendees: [
            {
                type: Schema.Types.ObjectId,
                ref: "Attendee",
                default: [],
            },
        ],
        groups: [
            {
                type: Schema.Types.ObjectId,
                ref: "Group",
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    },
);

interface EventDocument extends Document, IEvent {}

// Pre-save hook to prevent duplicate event names for the same organizer
eventSchema.pre<EventDocument>("save", async function (next) {
    const event = this;

    // Check if an event with the same name already exists for the organizer
    const existingEvent = await mongoose.models.Event.findOne({
        eventName: event.eventName,
        organizer: event.organizer,
    });

    if (existingEvent) {
        const error = new Error(
            "The same user cannot create duplicate events with the same name.",
        );
        return next(error);
    }

    next();
});

export default mongoose.model<IEvent>("Event", eventSchema);


