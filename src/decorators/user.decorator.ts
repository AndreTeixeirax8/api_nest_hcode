import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  //deixado só o _ pois não nos importamos com os dados que vão vir
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      return request.user;
    } else {
      throw new NotFoundException(
        'Usuario não encontradp no request use o authguard para obter o usuario',
      );
    }
  },
);
