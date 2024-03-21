import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomTokenException } from '../utils/custom-validation.exception';

export const ValidToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (typeof authToken !== 'string') {
      throw new CustomTokenException('No authorization token provided');
    }

    const [, token] = authToken.split(' ');
    if (!token || token.length < 10) {
      throw new CustomTokenException('Invalid token');
    }

    return token;
  },
);
