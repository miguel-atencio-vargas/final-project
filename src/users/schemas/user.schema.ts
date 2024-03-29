import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  role: string;

  @Prop({ type: String })
  companyId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
