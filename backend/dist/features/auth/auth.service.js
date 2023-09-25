"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const crypto_util_1 = require("../../utils/crypto.util");
const config_1 = require("../../config/config");
let AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async login(loginDto) {
        try {
            let { email, password } = loginDto;
            const user = await this.usersService.findByEmail(email);
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const validatePassword = await bcrypt.compare(password, user.password);
            console.log('validatedPAssword Obj:', validatePassword);
            if (!validatePassword)
                throw new common_1.UnauthorizedException('Invalid password');
            delete user.password;
            return {
                token: this.jwtService.sign({
                    email: user.email
                }),
                message: 'success',
                user
            };
        }
        catch (error) {
            this.logger.error(`Error in login: ${error.message}`);
            throw error;
        }
    }
    async register(createUserDto) {
        try {
            let { email, password } = createUserDto;
            const existingUser = await this.usersService.findByEmail(email);
            if (existingUser)
                throw new common_1.ConflictException('User with this email already exists');
            createUserDto.password = await bcrypt.hashSync(password, parseInt(config_1.config.HASH_SALT));
            console.log('hashed passwpord: ', createUserDto.password);
            const newUser = await this.usersService.createUser(createUserDto);
            return {
                token: this.jwtService.sign({ email: newUser.email }),
                message: 'success',
                user: newUser,
            };
        }
        catch (error) {
            this.logger.error(`Error whiile registering: ${error.message}`);
            throw error;
        }
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map