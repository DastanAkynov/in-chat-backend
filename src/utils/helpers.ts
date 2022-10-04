import { HttpException } from '@nestjs/common';

export const throwError = (message: string, status = 500) => {
  throw new HttpException(message, status);
};