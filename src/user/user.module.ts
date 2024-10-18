import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
