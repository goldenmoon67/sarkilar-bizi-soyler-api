import { Injectable, BadRequestException, Logger, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly s3BucketName = process.env.AWS_S3_BUCKET_NAME;
  constructor(
    @InjectModel(Users.name)
    private readonly usersModel: Model<UsersDocument>,
  ) {}

  async findAll(
   
  ) {
    return await this.usersModel.find({});
  }

}
