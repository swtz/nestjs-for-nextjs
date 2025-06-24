import { Controller, Get, Param } from '@nestjs/common';
import { CustomParseInPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';

@Controller('user')
export class UserController {
  @Get(':id')
  findOne(@Param('id', CustomParseInPipe) id: number) {
    return `Olá UserController!, id:${id}`;
  }
}
