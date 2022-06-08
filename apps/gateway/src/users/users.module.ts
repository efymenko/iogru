// local
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { Env } from '../app.env-validator';

// libs
import { USERS_SERVICE_NAME } from '@iogru/protos/users.service.v1';
import { createGrpcOptions } from '@iogru/protos';

//global
import { ClientGrpc, ClientsModule } from '@nestjs/microservices';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      inject: [USERS_SERVICE_NAME],
      useFactory: (client: ClientGrpc) => client.getService(USERS_SERVICE_NAME),
    },
  ],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    ClientsModule.registerAsync([
      {
        name: USERS_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService<Env, true>) =>
          createGrpcOptions({
            name: USERS_SERVICE_NAME,
            url: configService.get('USERS_SERVICE_GRPC_URL'),
          }),
      },
    ]),
  ],
})
export class UsersModule {}
