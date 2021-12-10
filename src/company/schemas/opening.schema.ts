import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Company } from './company.schema';

export type OpeningDocument = Opening & Document;

@Schema({ timestamps: true })
export class Opening {
  @Prop()
  _id: string;

  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String, unique: true })
  description: string;

  @Prop({ type: String, ref: Company.name })
  companyId: string;
}
export const OpeningSchema = SchemaFactory.createForClass(Opening);
