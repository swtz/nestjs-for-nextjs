import { BadRequestException, ParseIntPipe } from '@nestjs/common';

export class CustomParseInPipe extends ParseIntPipe {
  constructor() {
    super({
      exceptionFactory: () =>
        new BadRequestException('Parâmetro precisar ser um número'),
    });
  }
}
