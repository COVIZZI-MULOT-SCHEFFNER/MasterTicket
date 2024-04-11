import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwtToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return null;

    const [, token] = authHeader.split(' ');
    return token;
  },
);