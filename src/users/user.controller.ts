import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
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

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() patchUserDto: PatchUserDto) {
    return this.userService.updateOne(id, patchUserDto);
  }
}
