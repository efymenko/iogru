import { LoggerModule } from '@iogru/logger';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './app.env-validator';

@Module({
  imports: [
    LoggerModule.winston('users'),
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
