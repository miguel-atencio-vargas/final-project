import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Opening } from '../../company/schemas/opening.schema';
import { Stage } from '../../company/schemas/stage.schema';

export type CandidateDocument = Candidate & Document;

@Schema({ timestamps: true })
export class Candidate {
  @Prop()
  _id: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  uid: string;

  @Prop({ type: String, default: null, ref: Opening.name })
  openingId: string;

  @Prop({ type: String, default: null, ref: Stage.name })
  stageId: string;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
