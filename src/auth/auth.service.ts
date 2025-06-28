import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    const error = new UnauthorizedException('Usuário ou senha inválidos');

    if (!user) {
      throw error;
    }

    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw error;
    }

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return { accessToken };
  }
}
