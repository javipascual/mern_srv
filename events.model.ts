import { Document, Model, Schema, model } from "mongoose";

interface IEventDocument extends Document {
  date: string;
  descr: string;
}

const eventSchema = new Schema({
  date: { type: String },
  descr: { type: String },
});

export const Event = model<IEventDocument, Model<IEventDocument>>('Events', eventSchema);