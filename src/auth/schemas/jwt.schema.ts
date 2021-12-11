import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type JtiDocument = Jti & Document;

@Schema({ timestamps: true })
export class Jti {
  @Prop()
  _id: string;
}

export const JtiSchema = SchemaFactory.createForClass(Jti);
