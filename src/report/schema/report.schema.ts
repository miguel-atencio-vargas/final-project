import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Company } from '../../company/schemas/company.schema';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  @Prop()
  _id: string;

  @Prop({ type: String, required: true })
  recruiterEmail: string;

  @Prop({ type: String, required: true, ref: Company.name })
  companyId: string;

  @Prop({ type: String, required: true })
  company: string;

  @Prop({ type: Array, required: true })
  stages: [];

  @Prop({ type: Array, required: true })
  openings: [];
}

export const ReportSchema = SchemaFactory.createForClass(Report);
