import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Env } from '../app.env-validator';
import { AccessTokensService } from './access-tokens.service';

@Module({
  providers: [AccessTokensService],
  exports: [AccessTokensService],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<Env, true>) {
        return {
          secret: config.get('ACCESS_TOKEN_SECRET', { infer: true }),
          signOptions: {
            expiresIn: config.get('ACCESS_TOKEN_EXPIRES_IN', { infer: true }),
          },
        };
      },
    }),
  ],
})
export class AccessTokensModule {}
