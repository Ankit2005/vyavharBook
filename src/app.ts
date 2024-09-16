import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import userRouter from "./user/user-router";
import eventRouter from "./eventManagement/event-router";
import attendeeRouter from "./attendees/attendee-router";
import groupRouter from "./group/group-router";
import loginRouter from "./auth/auth-route";
// import cors from "cors";

const app = express();
// app.use(
//     cors({
//         origin: ["http://localhost:5173"],
//         // origin: ["http://127.0.0.1:5173"],
//         credentials: true,
//     }),
// );
app.use(express.static("public"));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

// Auth routes
app.use("/api/auth", loginRouter)

// Users routes
app.use("/api/user", userRouter);

// Events routes
app.use("/api/event", eventRouter);

// Attendees routes
app.use("/api/attendee", attendeeRouter);

// Groups routes
app.use("/api/group", groupRouter);


// Global error handling middleware
app.use(globalErrorHandler);

export default app;
