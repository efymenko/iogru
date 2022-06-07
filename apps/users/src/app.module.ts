import { LoggerModule } from '@iogru/logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Env, validate } from './app.env-validator';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    LoggerModule.winston('users'),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env, true>) => ({
        uri: configService.get('MONGO_URI', { infer: true }),
      }),
    }),
    ConfigModule.forRoot({
      cache: true,
      ignoreEnvFile: true,
      expandVariables: true,
      isGlobal: true,
      validate,
    }),
  ],
})
export class AppModule {}
