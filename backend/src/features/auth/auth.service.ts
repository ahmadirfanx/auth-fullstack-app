import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './dto/auth-response.dto';
import { CreateUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/features/users/users.service';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private readonly usersService: UsersService) { }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new UnauthorizedException('Invalid password');
        }

        delete user.password;

        return {
            token: this.jwtService.sign({
                email: user.email // Use the retrieved user's email
            }),
            message: 'success',
            user
        };
    }

    async register(createUserDto: CreateUserDto): Promise<AuthResponse> {

        try {
            const { email } = createUserDto;

            // Check if a user with the provided email already exists
            const existingUser = await this.usersService.findByEmail(email);

            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }

            // Create the user if they don't exist
            const newUser = await this.usersService.createUser(createUserDto);

            return {
                token: this.jwtService.sign({ email: newUser.email }),
                message: 'success',
                user: newUser,
            };
        } catch (error) {
            throw error;
        }
    }
}
