import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService, {
          provide: TodoService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((todo: CreateTodoDto) =>
                Promise.resolve({ id: 1, ...todo }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                content: 'test1'
              },
              {
                content: 'test2'
              }
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                content: 'test1',
                id,
              }),
            ),
            update: jest.fn().mockImplementation((id: number, todo: UpdateTodoDto) =>
              Promise.resolve({ id, ...todo })
            ),
            remove: jest.fn(),
          },
        }
      ],
    }).compile();

    controller = app.get<TodoController>(TodoController);
    service = app.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
