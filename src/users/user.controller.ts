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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';

import { CreateSudoUserDto } from './dto/create-sudo-user.dto';
import { PutUserDto } from './dto/put-user.dto';
import { RoleUser } from './enum/roles.enums';
import { UserService } from './user.service';

@ApiTags('users - crud')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Creates a new sudo admin' })
  @ApiResponse({
    status: 201,
    description: 'New sudo user created',
    type: CreateSudoUserDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Post('sudo/create')
  newSudoAdmin(@Body() data: CreateSudoUserDto) {
    return this.userService.create(data, RoleUser.SUDO_ADMIN);
  }

  @ApiOperation({ summary: 'Creates a new company admin' })
  @ApiResponse({
    status: 201,
    description: 'New company user created',
    type: CreateCompanyUserDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Post('companies/:companyId/create')
  newCompanyUser(
    @Param('companyId') companyId: string,
    @Body() data: CreateCompanyUserDto,
  ) {
    return this.userService.create(data, data.roleEnum, companyId);
  }

  @ApiOperation({ summary: 'Returns a user by Id' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user by Id',
  })
  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @ApiOperation({ summary: 'Returns all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
  })
  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Updates an user in the DB' })
  @ApiResponse({
    status: 201,
    description: 'User updated',
    type: PutUserDto,
  })
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() patchUserDto: PutUserDto) {
    return this.userService.updateOne(id, patchUserDto);
  }

  @ApiOperation({ summary: 'Deletes an user in the DB' })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeOne(id);
  }
}
