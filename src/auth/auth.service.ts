import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

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

    constructor(private jwtService: JwtService){

    }

    validateUser({username, password}: AuthPayloadDto){
        const findUser = fakeUsers.find((user) => user.username === username);
        if(!findUser) return null;
        if(password === findUser.password){
            const { password, ...user} = findUser;
            return {
                "accessToken": this.jwtService.sign(user)
            }
        }
    }
}
