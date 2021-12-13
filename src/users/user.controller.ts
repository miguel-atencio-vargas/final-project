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
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';

import { CreateSudoUserDto } from './dto/create-sudo-user.dto';
import { PutUserDto } from './dto/put-user.dto';
import { RoleUser } from './enum/roles.enums';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Post('sudo/create')
  newSudoAdmin(@Body() data: CreateSudoUserDto) {
    return this.userService.create(data, RoleUser.SUDO_ADMIN);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Post('companies/:companyId/create')
  newCompanyUser(
    @Param('companyId') companyId: string,
    @Body() data: CreateCompanyUserDto,
  ) {
    return this.userService.create(data, data.roleEnum, companyId);
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
