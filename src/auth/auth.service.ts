import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    console.log(loginDto instanceof LoginDto, loginDto);
    return loginDto;
  }
}
