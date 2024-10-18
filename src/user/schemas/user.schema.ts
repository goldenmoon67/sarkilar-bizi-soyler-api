import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UsersDocument = Users & Document;
@Schema()
export class Users {
  @Prop({ type: String, required: true, index: true })
  userId: string;
 
}

export const UsersSchema = SchemaFactory.createForClass(Users);
