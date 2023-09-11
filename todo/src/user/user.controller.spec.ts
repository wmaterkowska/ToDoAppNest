import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const createUserDto: CreateUserDto = {
  email: 'test1@test.com',
  password: 'test1',
}

const updateUserDto: UpdateUserDto = {
  password: 'testnew'
}

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: 1, ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                email: 'test1@test.com',
                password: 'test1',
              },
              {
                email: 'test2@test.com',
                password: 'test2',
              }
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                email: 'test1@test.com',
                password: 'test1',
                id,
              }),
            ),
            update: jest.fn()
              .mockImplementation((id: string, user: UpdateUserDto) =>
                Promise.resolve({ id: 1, email: 'test1@test.com', ...user, todos: [] })
              ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<UserController>(UserController);
    service = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      controller.create(createUserDto);
      expect(controller.create(createUserDto)).resolves.toEqual({
        id: 1,
        ...createUserDto,
      });
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(controller.findOne('1')).resolves.toEqual({
        email: 'test1@test.com',
        password: 'test1',
        id: 1,
      });
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update the user password', () => {
      expect(controller.update("1", updateUserDto)).resolves.toEqual({
        id: 1,
        email: 'test1@test.com',
        ...updateUserDto,
        todos: []
      });
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      controller.remove('2');
      expect(service.remove).toHaveBeenCalled();
    });
  });

});
