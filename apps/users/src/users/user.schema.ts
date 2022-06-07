import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DateProp } from '@iogru/common';
import { UserResponse } from '@iogru/protos/users.service.v1';

export type UserDocument = User & Document;

export type UserLean = User & { id: string };

@Schema({ timestamps: true })
export class User implements Omit<UserResponse, 'id'> {
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
  createdAt: number;

  @DateProp()
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
