import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTimestampsConfig } from 'mongoose';

export type VNSeDocument = VNSe & Document & SchemaTimestampsConfig;
@Schema({
  timestamps: true,
})
export class VNSe {
  _id: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
  })
  thumbnail: string;

  @Prop({
    type: Number,
  })
  price: number;
}

export const VNSeSchema = SchemaFactory.createForClass(VNSe);
