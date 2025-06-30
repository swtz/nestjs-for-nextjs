import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async findOneByOrFail(userData: Partial<User>) {
    const user = await this.userRepository.findOneBy(userData);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const exists = await this.userRepository.existsBy({
      email: dto.email,
    });

    if (exists) {
      throw new ConflictException('Email já existe');
    }

    const hashedPassword = await this.hashingService.hash(dto.password);
    const newUser = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    };

    const created = this.userRepository.save(newUser);
    return created;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, userDto: UpdateUserDto) {
    if (!userDto.name && !userDto.email) {
      throw new BadRequestException('Dados não enviados');
    }

    const user = await this.findOneByOrFail({ id });

    user.name = userDto.name ?? user.name;
  }

  save(user: User) {
    return this.userRepository.save(user);
  }
}
