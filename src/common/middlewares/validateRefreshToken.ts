import mongoose from "mongoose";
import config from "config";
import { expressjwt } from "express-jwt";
import { Request } from "express";
import { AuthCookie } from "../types";
import RefreshToken from "../../common/model/refreshToken.model"; // Assuming Mongoose model for refresh token
import logger from "../../config/logger";

// Define the interface for refresh token payload
interface IRefreshTokenPayload {
    id: string;
    role: string;
    refreshTokenId: string; // Token ID from payload
}

// Refresh token authentication middleware
export default expressjwt({
    secret: config.get<string>("auth.REFRESH_TOKEN_SECRET"), // Use the secret key from the config
    algorithms: ["HS256"], // HS256 algorithm

    // Retrieve the token from the request's cookies
    getToken(req: Request) {
        const { refreshToken } = req.cookies as AuthCookie; // Extract the refresh token from cookies
        return refreshToken; // Return the refresh token
    },

    // Function to check if the refresh token is revoked
    async isRevoked(request: Request, token) {
        try {
            // Extract payload details from the token
            const tokenPayload = token?.payload as IRefreshTokenPayload;
            const tokenId = tokenPayload.refreshTokenId; // Token ID from payload
            const userId = tokenPayload.id; // User ID
            const role = tokenPayload.role; // User role

            // Log values for debugging

            // Validate tokenId and userId
            if (
                !mongoose.Types.ObjectId.isValid(tokenId) ||
                !mongoose.Types.ObjectId.isValid(userId)
            ) {
                return true; // Consider token revoked if IDs are invalid
            }

            // Find refresh token in MongoDB using Mongoose
            const refreshToken = await RefreshToken.findOne({
                _id: new mongoose.Types.ObjectId(tokenId), // Convert tokenId to ObjectId explicitly
                user: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId as well
            });

            // Log the result of the query

            // If no token is found, consider it revoked
            return refreshToken === null;
        } catch (err: any) {
            // Log error if token lookup fails
            logger.error("Error while getting the refresh token", {
                id: (token?.payload as IRefreshTokenPayload).id,
                error: err?.message,
            });
        }

        // Default to token being revoked if there's an error
        return true;
    },
});
