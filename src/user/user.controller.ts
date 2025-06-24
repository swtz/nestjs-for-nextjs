import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseInPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':id')
  findOne(@Param('id', CustomParseInPipe) id: number) {
    console.log(this.configService.getOrThrow('TESTE'));
    return `Olá UserController!, id:${id}`;
  }
}
