import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Env } from '../app.env-validator';
import { RefreshTokensService } from './refresh-tokens.service';

@Module({
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<Env, true>) {
        return {
          secret: config.get('REFRESH_TOKEN_SECRET', { infer: true }),
          signOptions: {
            expiresIn: config.get('REFRESH_TOKEN_EXPIRES_IN', { infer: true }),
          },
        };
      },
    }),
  ],
})
export class RefreshTokenModule {}
