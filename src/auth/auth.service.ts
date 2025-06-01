import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

const fakeUsers = [
    {
    id: 1,
    username: 'alper',
    password: 'password',
    },
    {
    id: 2,
    username: 'hasan',
    password: 'password123',
    }
]

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){

    }

    async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) return null;

    if (user.password === password) {
      const { password, ...result } = user;
      return {
        accessToken: this.jwtService.sign(result),
      };
    }

    throw new HttpException("Invalid Credentials", 401);
  }
}
