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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_interface_1 = require("../../interface/user.interface");
let UsersService = UsersService_1 = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async getUser(email) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            user.password = undefined;
            return user;
        }
        catch (error) {
            this.logger.error(`Error in Getting User ${error.message}`);
            throw error;
        }
    }
    async createUser(data) {
        try {
            const { email, name, password } = data;
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser)
                throw new common_1.ConflictException('Username already exists');
            const newUser = new this.userModel({
                email,
                name,
                password,
            });
            await newUser.save();
            newUser.password = undefined;
            return newUser;
        }
        catch (error) {
            this.logger.error(`Error in Creating User ${error.message}`);
            throw error;
        }
    }
    async findByEmail(email) {
        try {
            return await this.userModel.findOne({ email });
        }
        catch (error) {
            this.logger.error(`Error in find by email ${error.message}`);
            throw error;
        }
    }
};
UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map