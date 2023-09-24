import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const AuthUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user; // Assuming that the user data is stored in the request object

  // Remove sensitive data like passwords before returning the user
  if (user && user.password) {
    user.password = undefined;
  }

  return user;
});

export default AuthUser;