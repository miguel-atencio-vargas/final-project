import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  firstName: number;

  @Prop({ type: String })
  lastName: string;

  @Prop()
  role: number;

  //TODO: @IsMongoId()
  @Prop()
  companyId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
