import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './dto/auth-response.dto';
import { CreateUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/features/users/users.service';
export declare class AuthService {
    private jwtService;
    private readonly usersService;
    private readonly logger;
    constructor(jwtService: JwtService, usersService: UsersService);
    login(loginDto: LoginDto): Promise<AuthResponse>;
    register(createUserDto: CreateUserDto): Promise<AuthResponse>;
}
