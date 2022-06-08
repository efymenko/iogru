// libs
import { DateProp } from '@iogru/common';

// global
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type UserLean = User & { id: string };

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  aboutMe: string;

  @Prop()
  phoneNumber: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @DateProp()
  createdAt: string;

  @DateProp()
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
