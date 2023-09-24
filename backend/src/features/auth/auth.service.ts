import { Injectable, NotFoundException, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './dto/auth-response.dto';
import { CreateUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/features/users/users.service';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name); // Logger initialization

    constructor(private jwtService: JwtService, private readonly usersService: UsersService) { }

    /**
     * Handles the auth of the user ands logs in if aothorized
     * @param loginDto 
     * @returns 
     */
    async login(loginDto: LoginDto): Promise<AuthResponse> {
        try {
            const { email, password } = loginDto;

            const user = await this.usersService.findByEmail(email);

            if (!user) throw new NotFoundException('User not found');

            const validatePassword = await bcrypt.compare(password, user.password);

            if (!validatePassword) throw new UnauthorizedException('Invalid password');

            delete user.password;

            return {
                token: this.jwtService.sign({
                    email: user.email // Use the retrieved user's email
                }),
                message: 'success',
                user
            };
        } catch (error) {
            this.logger.error(`Error in login: ${error.message}`);
            throw error;
        }
    }

    /**
     * Handles the Registration of a new user by Authorizing it
     * @param createUserDto 
     * @returns 
     */
    async register(createUserDto: CreateUserDto): Promise<AuthResponse> {

        try {
            const { email } = createUserDto;

            // Check if a user with the provided email already exists
            const existingUser = await this.usersService.findByEmail(email);

            if (existingUser) throw new ConflictException('User with this email already exists');

            // Create the user if they don't exist
            const newUser = await this.usersService.createUser(createUserDto);

            return {
                token: this.jwtService.sign({ email: newUser.email }),
                message: 'success',
                user: newUser,
            };
        } catch (error) {
            this.logger.error(`Error whiile registering: ${error.message}`);
            throw error;
        }
    }
}
