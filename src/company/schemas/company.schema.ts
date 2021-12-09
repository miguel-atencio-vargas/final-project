import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop()
  _id: string;

  @Prop({ type: String, unique: true })
  name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
