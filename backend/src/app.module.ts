import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environment/environment';


@Module({
  imports: [UsersModule, AuthModule,
    MongooseModule.forRoot(environment.MONGO_URI)],
  controllers: [],
  providers: [],
})
export class AppModule { }
