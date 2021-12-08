import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   *
   * @param updateUserDto
   * @returns one user updated
   */
  async updateOne(
    userId: string,
    patchUserDto: PatchUserDto,
  ): Promise<ReadUserDto> {
    throw new NotImplementedException();
  }

  /**
   *
   * @param createUserDto
   * @returns a new user created
   */
  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    try {
      const newUser = new this.userModel(createUserDto);
      const savedUser = await newUser.save();
      return plainToClass(ReadUserDto, savedUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   *
   * @param id
   * @returns a user by ID
   */
  async findOne(userId: string): Promise<ReadUserDto> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException();
    return plainToClass(ReadUserDto, user);
  }

  /**
   *
   * @returns all users in the DB
   */
  async getAll(): Promise<ReadUserDto[]> {
    const users = await this.userModel.find();
    if (users.length === 0) throw new NotFoundException();
    return users.map((user) => plainToClass(ReadUserDto, user));
  }
}
