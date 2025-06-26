import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomParseInPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  @Get(':id')
  findOne(@Param('id', CustomParseInPipe) id: number) {
    return `Olá UserController!, id:${id}`;
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {}
}
