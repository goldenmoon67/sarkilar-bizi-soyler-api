
import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}


  @Get('list')
  findAll(@Req() params) {
    return this.service.findAll(
    
    );
  }

}
