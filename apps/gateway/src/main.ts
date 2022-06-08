// local
import { AppModule } from './app.module';
import { Env } from './app.env-validator';

// libs
import { LoggerService } from '@iogru/logger';

// global
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

const up = async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: { credentials: true },
  });

  const logger = await app.resolve(LoggerService);
  const config: ConfigService<Env, true> = app.get(ConfigService);

  app.useLogger(logger);

  app.use(cookieParser());

  const HTTP_PORT = config.get('HTTP_PORT', { infer: true });

  app.enableShutdownHooks();

  app.listen(HTTP_PORT, () => logger.info('Gateway launched.', { HTTP_PORT }));
};

up();
