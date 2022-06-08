// local
import { Env, validate } from './app.env-validator';
import { UsersModule } from './users/users.module';

// libs
import { LoggerModule, LoggerService } from '@iogru/logger';

// global
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    LoggerModule.winston('users'),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env, true>) => ({
        uri: configService.get('MONGO_URI', { infer: true }),
        retryAttempts: 1,
        retryDelay: 1000,
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
export class AppModule implements OnApplicationShutdown {
  constructor(private readonly logger: LoggerService) {}

  /**
   * @required `app.enableShutdownHooks()` into [main.ts](./main.ts)
   */
  onApplicationShutdown(signal?: string) {
    this.logger.crit(`The apllication shut down with ${signal} signal.`);
  }
}
