import mongoose, { Schema } from "mongoose";
import { IUser } from "./user-types";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"], 
            unique: true,
            trim: true, 
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [30, "Username cannot exceed 30 characters"] 
        },
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minlength: [3, "FirstName must be at least 3 characters long"],
            maxlength: [30, "FirstName cannot exceed 30 characters"] 
        },
        middleName: {
            type: String,
            required: [true, "middle name is required"],
            trim: true,
            minlength: [3, "MiddleName must be at least 3 characters long"],
            maxlength: [30, "MiddleName cannot exceed 30 characters"] 
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minlength: [3, "LastName must be at least 3 characters long"], 
            maxlength: [30, "LastName cannot exceed 30 characters"] 
        },
        email: {
            type: String,
            required: false,
            unique: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            select : false
        },
        profilePic: {
            type: String, // URL of the user's profile picture (optional)
            default: null
        },
        mobileNumber: {
            type: String,
            required: [true, "Mobile number is required"],
            unique: true,
            match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"] 
        },
        dateOfBirth: {
            type: Date,
            validate: {
                validator: function (v: Date) {
                    const today = new Date();
                    const ageDiff = today.getFullYear() - v.getFullYear();
                    const ageMonth = today.getMonth() - v.getMonth();
                    const ageDay = today.getDate() - v.getDate();
                    return (
                        ageDiff > 18 ||
                        (ageDiff === 18 && ageMonth >= 0 && ageDay >= 0)
                    );
                },
                message: "User must be at least 18 years old"
            }
        },
        address: {
            type: String, // Optional address
            trim: true,
            maxlength: [100, "Address cannot exceed 100 characters"]
        },
        role: {
            type: String,
            enum: ["user", "admin"], // Role can only be 'user' or 'admin'
            default: "user"
        },
        groupsJoined: [
            { type: Schema.Types.ObjectId, ref: "Group", default: [] }, // Initialize as empty array
          ],
        contributions: [
            {
              groupId: {
                type: Schema.Types.ObjectId,
                ref: "Group",
                required: true,
              },
              amount: { type: Number, required: true },
            }
          ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }, // To include virtual fields in responses
        toObject: { virtuals: true }
    }
);

export default mongoose.model<IUser>("User", userSchema);

// create only this below data schema i have give step by step okay and use typescript

// event name 	Rohan marrige
// event date	10/12/2024
// organize name	rohan

// Firstname	MiddleName	LastName	village / city	deposited amount 	added amount	aseet (not rrequired)	mobile number (not required)
// Ankit    	Mumabhai	Bharvad	Kadi	5000	500	gold ring	9898569587
// Nirav	Mumabhai	Bharvad	Kadi	5000	500	silver ring	9898569587
// mayur	rameshbhai	Bharvad	Kadi	5000	500	gold ring	9898569587
