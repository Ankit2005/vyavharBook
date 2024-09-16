

import { body } from 'express-validator';
import mongoose from 'mongoose';
// import { IGroup } from '../models/Group'; // Adjust the import based on your file structure
// import { NextFunction, Request, Response } from 'express';

const groupValidators = [
  body('groupName')
    .exists()
    .withMessage('Group name is required')
    .isString()
    .withMessage('Group name must be a string')
    .isLength({ min: 3 })
    .withMessage('Group name must be at least 3 characters long')
    .isLength({ max: 50 })
    .withMessage('Group name cannot exceed 50 characters'),

  body('event')
    .exists()
    .withMessage('Event reference is required')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid Event ID format')
    .custom(async (value) => {
      // Optionally, check if the event exists in the database
      const Event = mongoose.model('Event'); // Adjust based on your model setup
      const event = await Event.findById(value);
      if (!event) {
        throw new Error('Event not found');
      }
      return true;
    }),

  body('members')
    .optional()
    .isArray()
    .withMessage('Members must be an array')
    .custom((members: any[]) => {
      return members.every(memberId => mongoose.Types.ObjectId.isValid(memberId));
    })
    .withMessage('All members must have a valid ObjectId format')
    .custom(async (members: any[]) => {
      // Optionally, check if all members exist in the database
      const Attendee = mongoose.model('Attendee'); // Adjust based on your model setup
      const attendees = await Attendee.find({ _id: { $in: members } });
      if (attendees.length !== members.length) {
        throw new Error('One or more members not found');
      }
      return true;
    }),
];

export default groupValidators;
