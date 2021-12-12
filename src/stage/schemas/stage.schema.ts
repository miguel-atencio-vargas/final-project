import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Company } from '../../company/schemas/company.schema';

export type StageDocument = Stage & Document;

@Schema({ timestamps: true })
export class Stage {
  @Prop()
  _id: string;

  @Prop({ type: String, unique: true })
  title: string;

  @Prop({ type: String, unique: true })
  description: string;

  @Prop({ type: String, ref: Company.name })
  companyId: string;
}

export const StageSchema = SchemaFactory.createForClass(Stage);
