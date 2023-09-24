import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../auth/dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';


@Injectable()
export class UsersService {

    private readonly logger = new Logger(UsersService.name); // Logger initialization

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getUser(email: string): Promise<User> {

        try {
            const user = await this.userModel.findOne({ email });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            // Remove sensitive data like passwords before returning the user
            user.password = undefined;

            return user;
        } catch (error) {
            this.logger.error(`Error in Getting User ${error.message}`)
            throw error;
        }
    }

    async createUser(data: CreateUserDto): Promise<User> {

        try {
            const { email, name, password } = data;

            // Check if the username already exists
            const existingUser = await this.userModel.findOne({ email });

            if (existingUser) throw new ConflictException('Username already exists');

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user document in DB
            const newUser = new this.userModel({
                email,
                name,
                password: hashedPassword,
            });

            // Save the user to the database
            await newUser.save();

            // Remove the password field from the returned user
            newUser.password = undefined;

            return newUser;
        } catch (error) {
            this.logger.error(`Error in Creating User ${error.message}`)
            throw error;
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            return await this.userModel.findOne({ email });
        } catch (error) {
            this.logger.error(`Error in find by email ${error.message}`)
            throw error;
        }
    }
}
