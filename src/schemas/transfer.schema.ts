import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTimestampsConfig } from 'mongoose';

export type TransferDocument = Transfer & Document & SchemaTimestampsConfig;
@Schema({
  timestamps: true,
})
export class Transfer {
  _id: string;

  @Prop({
    type: String,
  })
  from: string;

  @Prop({
    type: String,
  })
  to: string;

  @Prop({
    type: Number,
  })
  value: number;

  @Prop({
    type: mongoose.Schema.Types.Date,
  })
  at: string;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
