import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

const userArray = [
  {
    email: 'test1@test.com',
    password: 'test1',
    todos: [],
  },
  {
    email: 'test2@test.com',
    password: 'test2',
    todos: [],
  },
];

const oneUser = {
  email: 'test1@test.com',
  password: 'test1',
  todos: [],
}

const updatedUser = {
  email: 'test1@test.com',
  password: 'testnew',
  todos: []
}

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(oneUser),
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            update: jest.fn().mockResolvedValue(updatedUser),
            remove: jest.fn(),
            delete: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const newUser = {
        email: 'test1@test.com',
        password: 'test1',
        todos: [],
      };
      expect(
        service.create({
          ...newUser
        }),
      ).resolves.toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne(1)).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('update()', () => {
    it(`should update the user's password`, () => {
      const updatedPassword = {
        password: 'testnew',
      };
      expect(
        service.update(1, { ...updatedPassword }),
      ).resolves.toEqual(updatedUser);
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove(2);
      expect(removeSpy).toBeCalledWith(2);
      expect(retVal).toBeUndefined();
    });
  });


});
