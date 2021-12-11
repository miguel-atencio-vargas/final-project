import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateSudoUserDto } from './dto/create-sudo-user.dto';
import { PutUserDto } from './dto/put-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { nanoid } from 'nanoid';
import { RoleUser } from './enum/roles.enums';
import { CreateCompanyUserDto } from './dto/create-company-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   *
   * @param userId
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
      if (!userUpdated)
        throw new NotFoundException(`User with id ${userId} not found`);
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
  async create(
    createUserDto: CreateSudoUserDto | CreateCompanyUserDto,
    role: RoleUser,
  ): Promise<ReadUserDto> {
    try {
      const userId = nanoid();
      const newUser = await this.userModel.create({
        _id: userId,
        role: RoleUser[role],
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
    if (!user) throw new NotFoundException();
    return plainToClass(ReadUserDto, user);
  }

  /**
   *
   * @param email
   * @returns a user by email
   */
  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   *
   * @returns all users in the DB
   */
  async getAll(): Promise<ReadUserDto[]> {
    const users = await this.userModel.find().sort({ createdAt: 'desc' });
    if (users.length === 0) throw new NotFoundException();
    return users.map((user) => plainToClass(ReadUserDto, user));
  }

  /**
   * @param id
   */
  async removeOne(userId: string): Promise<void> {
    const user = await this.userModel.findOneAndRemove({ _id: userId });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
  }
}
