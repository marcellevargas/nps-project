import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NpsSurveyDocument = HydratedDocument<NpsSurvey>;

@Schema({ timestamps: true })
export class NpsSurvey {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop()
  comment?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const NpsSurveySchema = SchemaFactory.createForClass(NpsSurvey);
