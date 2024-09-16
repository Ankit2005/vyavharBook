import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "../user/user-model";
// import RefreshToken from "../models/refresh-token-model";
import { TokenService } from "../services/TokenService"; // Import the TokenService
import { Logger } from "winston";
import { JwtPayload } from "jsonwebtoken";

const tokenService = new TokenService(); // Instantiate the TokenService

export class AuthController {
    constructor (private logger: Logger) {}

    login = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const { username, password } = req.body;
        
    
        try {
            // Validate input
            if (!username || !password) {
                throw createHttpError(400, "Username and password are required");
            }
    
            // Find the user by username
            const user: any = await User.findOne({ email : username }).exec();
    
            if (!user) {
    
                throw createHttpError(401, "Invalid username or password");
            }
    
            // Check if password matches
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                throw createHttpError(401, "Invalid username or password");
            }
    
            // Generate tokens
            const accessToken = tokenService.generateAccessToken({
                id: user._id.toString(),
                role: user.role,
            });
            // Persist the refresh token
         const newRefreshToken :any  =  await tokenService.persistRefreshToken(user);
    
            const refreshToken = tokenService.generateRefreshToken({
                refreshTokenId : newRefreshToken._id,
                id : user._id.toString(),
                role: user.role,
            });
    
            res.cookie("accessToken", accessToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60, // expire in 1h
                httpOnly: true, // very important flag
            });
    
            res.cookie("refreshToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, // expire in 1-year
                httpOnly: true, // very important flag
            });
    
            this.logger.info("user has been logged in", { id: user._id });
    
            res.json({ id: user._id });
    
            // Send response
            res.json({ id: user._id });
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    };

     refresh = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: JwtPayload = {
                id: req.body.id,
                role: req.body.role,
                refreshTokenId: req.body.refreshTokenId,
            };

            const accessToken = tokenService.generateAccessToken(payload);
            this.logger.info("create new accessToken");

            const user = await User.findById(Number( {_id : req.body.id}));

            if (!user) {
                const error = createHttpError(
                    400,
                    "User with token could not find.",
                );
                next(error);
                return;
            }

            // Persist the refresh token
            const newRefreshToken : any =
                await tokenService.persistRefreshToken(user);
            this.logger.info("create new refreshToken");

            // Delete old refresh token
            await tokenService.deleteRefreshToken(req.body.refreshTokenId);
            this.logger.info("delete old refreshToken");

            const refreshToken = tokenService.generateRefreshToken({
                ...payload,
                refreshTokenId : String(newRefreshToken._id),
            });

            res.cookie("accessToken", accessToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60, // expire in 1h
                httpOnly: true, // very important flag
            });

            res.cookie("refreshToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, // expire in 1-year
                httpOnly: true, // very important flag
            });

            this.logger.info("user has been logged in", { id: user.id });

            res.json({ id: user.id });
        } catch (error) {
            this.logger.error("error in 123x");
            next(error);
            return;
        }
    }

}