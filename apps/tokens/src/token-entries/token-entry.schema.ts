import { DateProp } from '@iogru/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenEntryDocument = TokenEntry & Document;

export type TokenEntryLean = TokenEntry & { id: string };

@Schema({ _id: false })
export class Footprint {
  @Prop({ required: true })
  ipv4: string;

  @Prop({ required: true })
  userAgent: string;
}

const FootprintSchema = SchemaFactory.createForClass(Footprint);

@Schema({ timestamps: true })
export class TokenEntry {
  @Prop({ required: true })
  userId: string;

  @Prop({ default: false })
  isRevoked: boolean;

  @DateProp()
  createdAt: string;

  @DateProp()
  updatedAt: string;

  @Prop({ required: true, schema: FootprintSchema })
  footprint: Footprint;
}

export const TokenEntrySchema = SchemaFactory.createForClass(TokenEntry);

export const TokenEntryModelDefinition = {
  name: TokenEntry.name,
  schema: TokenEntrySchema,
};
