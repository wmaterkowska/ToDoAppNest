import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

const todoArray = [
  {
    content: 'tets1'
  },
  {
    content: 'test2'
  }
];

const oneTodo = {
  content: 'test1'
}

const updatedTodo = {
  content: 'testnew'
}


describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, {
        provide: getRepositoryToken(Todo),
        useValue: {
          create: jest.fn().mockResolvedValue(oneTodo),
          findAll: jest.fn().mockResolvedValue(todoArray),
          findOne: jest.fn().mockResolvedValue(oneTodo),
          update: jest.fn().mockResolvedValue(updatedTodo),
          remove: jest.fn(),
        }
      },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
