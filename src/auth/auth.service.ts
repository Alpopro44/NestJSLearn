import { HttpException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private userService: UserService,
    ){

    }

    async validateUser({ username, password }: AuthPayloadDto) {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) return null;

    const isPasswordValid = await this.userService.validatePassword(password, user.password);
    
    if (isPasswordValid) {
      const { password, ...result } = user;
      return {
        accessToken: this.jwtService.sign(result),
      };
    }

    throw new HttpException("Invalid Credentials", 401);
  }
}
