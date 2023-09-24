import { User } from "src/interface/user.interface";

export class AuthResponse {
    token: string;
    user: User;
    message: string;
}