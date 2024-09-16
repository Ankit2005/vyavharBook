import mongoose, { Schema, model, Document } from 'mongoose';
import { IGroup } from './group-types';

// Interface for Group


// Group Schema Definition
const GroupSchema = new Schema<IGroup>({
  groupName: {
    type: String,
    required: [true, 'Group name is required'],
    trim: true,
    minlength: [3, 'Group name must be at least 3 characters long'],
    maxlength: [50, 'Group name must be less than 50 characters long']
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event reference is required']
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Attendee'
  }],
}, {
  timestamps: true
});

export default mongoose.model<IGroup>("Group", GroupSchema);
