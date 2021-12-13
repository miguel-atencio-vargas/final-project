import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Company } from './company.schema';

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

  @Prop({ type: String, default: null, ref: Stage.name })
  previusStage: string;

  @Prop({ type: String, default: null, ref: Stage.name })
  nextStage: string;
}

export const StageSchema = SchemaFactory.createForClass(Stage);
