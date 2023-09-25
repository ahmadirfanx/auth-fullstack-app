import { Controller, Post, Body, Get, UseGuards, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
        try {
            const result = await this.authService.login(loginDto);
            this.logger.log('User logged in successfully');
            return result;
        } catch (error) {
            this.logger.error(`Error during login: ${error.message}`);
            throw error;
        }
    }

    @Post('/signup')
    async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
        try {
            const result = await this.authService.register(createUserDto);
            this.logger.log('User registered successfully');
            return result;
        } catch (error) {
            this.logger.error(`Error during registration: ${error.message}`);
            throw error;
        }
    }

}
