import { CreateUserDto } from '../auth/dto/register-user.dto';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';
export declare class UsersService {
    private readonly userModel;
    private readonly logger;
    constructor(userModel: Model<User>);
    getUser(email: string): Promise<User>;
    createUser(data: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
}
