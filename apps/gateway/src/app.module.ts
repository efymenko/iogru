// local
import { validate } from './app.env-validator';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// libs
import { LoggerModule, LoggerService } from '@iogru/logger';

// global
import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    LoggerModule.winston('gateway'),
    ConfigModule.forRoot({
      cache: true,
      ignoreEnvFile: true,
      expandVariables: true,
      isGlobal: true,
      validate,
    }),
    AuthModule,
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
