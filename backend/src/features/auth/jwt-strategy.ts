import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { userInfo } from "os";
import { environment } from "src/environment/environment";
import { UsersService } from "src/features/users/users.service";

interface JwtPayload {
  email: string;
  userId: string;
  sub: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environment.JWT_SECRET || 'mysecret27&34!23m9', // Replace with your secret key
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        maxAge: environment.JWT_EXPIRY || '1h'
      }
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;

    // Find the user by username in MongoDB
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return { userId: payload.sub, username: payload.email };
  }
}