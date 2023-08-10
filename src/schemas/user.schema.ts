import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTimestampsConfig } from 'mongoose';

export type UserDocument = User & Document & SchemaTimestampsConfig;
@Schema({
  timestamps: true,
})
export class User {
  _id: string;

  @Prop({
    type: String,
  })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
