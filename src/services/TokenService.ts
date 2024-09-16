import config from 'config';
import fs from "node:fs";
import path from "node:path";
import { JwtPayload, sign } from "jsonwebtoken";
import createHttpError from "http-errors";
import RefreshToken from "../common/model/refreshToken.model"; // Import your Mongoose RefreshToken model
import { IRefreshToken } from '../common/types';

export class TokenService {

    private REFRESH_TOKEN_SECRET : string = config.get("auth.REFRESH_TOKEN_SECRET")

    generateAccessToken(payload: JwtPayload): string {
        let privateKey: Buffer;

        if (!config.get("auth.PRIVATE_KEY")) {
            throw createHttpError(500, "SECRET_KEY is not set");
        }
        try {
            privateKey = fs.readFileSync(
                path.join(__dirname, "../../certs/private.pem")
            );
        } catch (err) {
            throw createHttpError(
                500,
                "Error while reading private key"
            );
        }

        const accessToken = sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "1h",
            issuer: "auth-service",
        });

        return accessToken;
    }

    generateRefreshToken(payload: JwtPayload): string {

        if (!this.REFRESH_TOKEN_SECRET) {
            throw createHttpError(500, "REFRESH_TOKEN_SECRET is not set");
        }

        const refreshToken = sign(payload, this.REFRESH_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "1y",
            issuer: "auth-service",
            jwtid: String(payload.id),
        });

        return refreshToken;
    }

    async persistRefreshToken(user: any): Promise<IRefreshToken> {
        const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365; // 1 year

        const newRefreshToken = new RefreshToken({
            user: user._id, // Mongoose expects ObjectId for the reference
            expiresAt: new Date(Date.now() + MS_IN_YEAR),
        });

        await newRefreshToken.save();
        return newRefreshToken;
    }

    async deleteRefreshToken(tokenId: string): Promise<void> {
        await RefreshToken.deleteOne({ _id: tokenId });
    }
}
