import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { PutUserDto } from './dto/put-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  newUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() patchUserDto: PutUserDto) {
    return this.userService.updateOne(id, patchUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeOne(id);
  }
}
