import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { PutUserDto } from '../dto/put-user.dto';
import { ReadUserDto } from '../dto/read-user.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            getAll: jest.fn(),
            updateOne: jest.fn(),
            removeOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUsers()', () => {
    it('should return an array of users', () => {
      jest.spyOn(userService, 'getAll').mockResolvedValue([new ReadUserDto()]);
      expect(userController.getUsers()).resolves.toHaveLength(1);
      expect(userService.getAll).toBeCalledTimes(1);
    });
  });

  describe('getById()', () => {
    it('should return a user', () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(new ReadUserDto());
      const userId = '1';
      expect(userController.getUserById(userId)).resolves.toBeInstanceOf(
        ReadUserDto,
      );
      expect(userService.findOne).toBeCalledWith(userId);
      expect(userService.findOne).toBeCalledTimes(1);
    });
  });

  describe('createUser()', () => {
    const customerToCreate: CreateUserDto = {
      firstName: '',
      lastName: '',
      email: '',
      role: 0,
      companyId: 0,
    };
    it('should return a new user', () => {
      jest.spyOn(userService, 'create').mockResolvedValue(new ReadUserDto());
      expect(userController.newUser(customerToCreate)).resolves.toBeInstanceOf(
        ReadUserDto,
      );
      expect(userService.create).toBeCalledWith<CreateUserDto[]>(
        customerToCreate,
      );
    });
  });

  describe('updateUser()', () => {
    it('should update one or many properties of one user', () => {
      const userId = '1';
      jest.spyOn(userService, 'updateOne').mockResolvedValue(new ReadUserDto());
      expect(
        userController.updateUser(userId, new PutUserDto()),
      ).resolves.toBeInstanceOf(ReadUserDto);
      expect(userService.updateOne).toBeCalledWith(userId, new PutUserDto());
      expect(userService.updateOne).toBeCalledTimes(1);
    });
  });

  describe('removeUser()', () => {
    it('should delete a user', () => {
      const userId = '1';
      userController.removeUser(userId);
      expect(userService.removeOne).toBeCalledWith(userId);
    });
  });
});
