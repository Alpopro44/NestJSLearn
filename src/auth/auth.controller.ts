import { Res, Body, Controller, HttpException, Post, Req, UseGuards, Get, Render} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserService } from 'src/user/user.service';
import { join } from 'path';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private readonly userService: UserService){

    }


    @Post('login')
    @UseGuards(LocalGuard)
    login(@Body() authpayload: AuthPayloadDto) {
        const user = this.authService.validateUser(authpayload); 
        return user;
    }

    @Get('login')
    loginPage(@Res() res: Response){
        const filePath = join(process.cwd(), 'views', 'login.html');
        res.sendFile(filePath);
    }

    @Post('register')
    register(@Body() body: { username: string; password: string }){
        return this.userService.create(body.username, body.password);
    }

    @Get('register')
    registerPage(@Res() res: Response){
        const filePath = join(process.cwd(), 'views', 'register.html');
        res.sendFile(filePath);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
        console.log("Inside AuthController status Method.");
        console.log(req.user);
        return req.user;
    }
}
