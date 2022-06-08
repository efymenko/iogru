// local
import { AppModule } from './app.module';
import { Env } from './app.env-validator';

// libs
import { createGrpcOptions } from '@iogru/protos';
import { LoggerService } from '@iogru/logger';

// global
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

const up = async () => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = await app.resolve(LoggerService);
  const config: ConfigService<Env, true> = app.get(ConfigService);

  app.useLogger(logger);

  const GRPC_URL = config.get('GRPC_URL', { infer: true });
  const HTTP_PORT = config.get('HTTP_PORT', { infer: true });

  const options = createGrpcOptions({ name: 'UsersService', url: GRPC_URL });

  app.connectMicroservice(options);

  await app.startAllMicroservices();

  app.enableShutdownHooks();

  app.listen(HTTP_PORT, () =>
    logger.info('Users Microservice launched.', { GRPC_URL, HTTP_PORT }),
  );
};

up();
