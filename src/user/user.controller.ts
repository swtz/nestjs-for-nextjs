import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomParseInPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', CustomParseInPipe) id: number,
  ) {
    console.log(req.user.email);
    return `Olá UserController!, id:${id}`;
  }

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(
    @Req() req: AuthenticatedRequest,
    @Body() userDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(req.user.id, userDto);
    return new UserResponseDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() userDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.updatePassword(req.user.id, userDto);
    return new UserResponseDto(user);
  }
}
