import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PutUserDto } from './dto/put-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { nanoid } from 'nanoid';

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
    putUserDto: PutUserDto,
  ): Promise<ReadUserDto> {
    try {
      const userUpdated = await this.userModel.findOneAndReplace(
        { _id: userId },
        putUserDto,
        { new: true },
      );
      return plainToClass(ReadUserDto, userUpdated);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   *
   * @param createUserDto
   * @returns a new user created
   */
  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    try {
      const userId = nanoid();
      const newUser = await this.userModel.create({
        _id: userId,
        ...createUserDto,
      });
      return plainToClass(ReadUserDto, newUser);
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
    console.log('🚀 | UserService | findOne | user', user);
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
