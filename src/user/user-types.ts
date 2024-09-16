import mongoose from "mongoose";

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email?: string;
    password: string;
    profilePic?: string;
    mobileNumber: string;
    dateOfBirth?: Date;
    address?: string;
    role: "user" | "admin";
    groupsJoined: mongoose.Types.ObjectId[];
    contributions: {
        groupId: mongoose.Types.ObjectId;
        amount: number;
    }[];
}

// export interface IUser {
//     username: string;
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     profilePic?: string;
//     mobileNumber: string;
//     dateOfBirth?: Date;
//     address?: string;
//     role: string;
//     groupsJoined: IGroup["_id"][];  // Array of group IDs the user has joined
//     contributions: IContribution[]; // Array of contributions made in groups
//     // comparePassword(candidatePassword: string): Promise<boolean>; // Method to compare passwords
// }
