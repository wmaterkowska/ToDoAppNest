import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const response = ctx.switchToHttp().getResponse();

    // console.log(response, "===================================================");
    console.log((request.headers.authentication), "------------------")
    return (request.headers.authentication).split(' ')[1];
  },
);
