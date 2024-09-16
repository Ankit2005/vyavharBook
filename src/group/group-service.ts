import groupModel from "./group-model";
import createHttpError from "http-errors";
import { IGroup } from "./group-types";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";

export class GroupService {
    async create({ groupName, event, members }: IGroup) {
        try {
            return await groupModel.create({
                groupName,
                event,
                members,
            });
        } catch (err: any) {
            const errMsg: any =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                err?.message || "Failed to store the data in the database";
            const error = createHttpError(500, errMsg);
            throw error;
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const groupId = req.params.groupId;
            const { groupName, event } = req.body;

            // Find the existing group
            const group = await groupModel.findById(groupId);

            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }

            // Check if the new groupName is already used for the same event
            if (groupName) {
                const existingGroup = await groupModel.findOne({
                    _id: { $ne: groupId },
                    groupName,
                    event,
                });

                if (existingGroup) {
                    return res
                        .status(400)
                        .json({
                            message: "Group name already exists for this event",
                        });
                }
            }

            // Prepare updates for the group
            const updates: Partial<IGroup> = {};

            if (groupName) {
                updates.groupName = groupName;
            }

            res.status(200).json({
                success: true,
                message: "Group name updated successfully ",
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll() {
        try {
            return await groupModel
                .find()
                .populate("event")
                .populate("members");
        } catch (err: any) {
            const errMsg: any =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                err?.message || "Failed to retrieve data from the database";
            const error = createHttpError(500, errMsg);
            throw error;
        }
    }

    async findById(groupId: string) {
        try {
            return await groupModel.findById({ _id: groupId });
        } catch (err: any) {
            const errMsg: any =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                err?.message || "Failed to retrieve data from the database";
            const error = createHttpError(500, errMsg);
            throw error;
        }
    }
}
