import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CustomParseInPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', CustomParseInPipe) id: number) {
    return `Olá UserController!, id:${id}`;
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
