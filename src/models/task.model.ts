import mongoose, { Schema, Document, Types } from "mongoose";
import { UserDocument } from "./user.model";

interface TaskDocument extends Document {
  title: string;
  description: string;
  date: Date;
  user: Types.ObjectId | UserDocument;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TaskDocument>("Task", taskSchema);
