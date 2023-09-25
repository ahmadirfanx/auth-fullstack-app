import { Strategy } from "passport-jwt";
import { UsersService } from "src/features/users/users.service";
interface JwtPayload {
    email: string;
    userId: string;
    sub: number;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(payload: JwtPayload): Promise<{
        userId: number;
        username: string;
    }>;
}
export {};
