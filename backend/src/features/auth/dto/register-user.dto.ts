import { IsString, Length } from 'class-validator';
import { IsStrongPassword } from 'src/common/password-validation.decorator';

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    @Length(1, 15)
    name: string;

    @IsString()
    @IsStrongPassword()
    password: string;


}