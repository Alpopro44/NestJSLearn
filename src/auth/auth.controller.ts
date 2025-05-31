import {Body, Controller, HttpException, Post, Req, UseGuards, Get} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Body() authpayload: AuthPayloadDto) {
        const user = this.authService.validateUser(authpayload); 
        return user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
        console.log("Inside AuthController status Method.");
        console.log(req.user);
        return req.user;
    }
}
