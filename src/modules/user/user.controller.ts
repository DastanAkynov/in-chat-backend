import { UserEntity } from '@Entities';
import { Auth } from '@Decorators/auth.decorator';
import { IAppResponse } from '@Types';
import { Body, Controller, Get, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { RoleCodes } from '@Enums';
import { IUserResponse } from './interfaces';

@Controller()
export class UserController {
  constructor(
    private userService: UserService
  ){}
  
  @Post('user')
  @UsePipes(ValidationPipe)
  async create(@Body() data: CreateUserDto): Promise<IUserResponse<UserEntity>>  {
    const user = await this.userService.create(data)
    return this.userService.buildResponse(user)
  }

  @Auth([RoleCodes.ADMIN])
  @Get('users')
  getAll(@Request() requset: any): Promise<IUserResponse<UserEntity[]>>{
    console.log(requset.user)
    return this.userService.getAll()
  }

}