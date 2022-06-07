import { LoggerService } from '@iogru/logger';
import { createGrpcOptions } from '@iogru/protos';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Env } from './app.env-validator';
import { AppModule } from './app.module';

const up = async () => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = await app.resolve(LoggerService);
  const config: ConfigService<Env, true> = app.get(ConfigService);

  app.useLogger(logger);

  const GRPC_PORT = config.get('GRPC_PORT', { infer: true });
  const HTTP_PORT = config.get('HTTP_PORT', { infer: true });

  const options = createGrpcOptions({ name: 'UsersService', port: GRPC_PORT });

  app.connectMicroservice(options);

  await app.startAllMicroservices();

  app.enableShutdownHooks();

  app.listen(HTTP_PORT, () =>
    logger.info('Users Microservice launched.', { GRPC_PORT, HTTP_PORT }),
  );
};

up();
