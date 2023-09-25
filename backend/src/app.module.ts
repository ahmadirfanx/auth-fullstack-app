import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/config';


@Module({
  imports: [UsersModule, AuthModule,
    MongooseModule.forRoot(config.MONGO_URI)],
  controllers: [],
  providers: [],
})
export class AppModule { }
