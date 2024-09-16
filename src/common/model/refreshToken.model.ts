import mongoose, { Schema } from "mongoose";
import { IRefreshToken } from "../types";
// import User from "./user/user-model"; // Import your User model

// Define the RefreshToken interface


// Create the RefreshToken schema
const refreshTokenSchema = new Schema<IRefreshToken>({
    expiresAt: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    }
}, {
    timestamps: true // This will automatically handle createdAt and updatedAt fields
});

// Create and export the model
const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", refreshTokenSchema);

export default RefreshToken;
