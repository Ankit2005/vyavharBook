import mongoose from 'mongoose';
import { Request } from "express";

export interface AuthRequest extends Request {
    auth: {
        role: string;
        id?: string;
        tenant: string;
    };
}

export type AuthCookie = {
    accessToken: string;
    refreshToken: string;
};


export interface IRefreshToken {
    expiresAt: Date;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}