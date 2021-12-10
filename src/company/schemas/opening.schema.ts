import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { SchemaTypes, Types, Document } from 'mongoose';
import { Company, CompanySchema } from './company.schema';

export type OpeningDocument = Opening & Document;

@Schema({ timestamps: true })
export class Opening {
  @Prop()
  _id: string;

  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String, unique: true })
  description: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Company.name })
  company: Types.ObjectId;
}
export const OpeningSchema = SchemaFactory.createForClass(Opening);
