import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // const response = ctx.switchToHttp().getResponse();
    try {

      const userId = (request.headers.authentication).split(' ')[1];
      if (!userId) {
        throw new UnauthorizedException();
      }
      return userId;
    } catch (error) {
      throw new UnauthorizedException();
    }
  },
);
