import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  RefreshTokenSignException,
  RefreshTokenVerifyException,
} from './exceptions/refresh-token-exceptions';
import { RefreshTokenPayload } from './types/refresh-token-payload.type';
import { ToSignRefreshToken } from './types/to-sign-refresh-token.type';

@Injectable()
export class RefreshTokensService {
  constructor(private readonly jwtService: JwtService) {}

  public async sign(toSign: ToSignRefreshToken) {
    const { userId, entryId } = toSign;
    try {
      return await this.jwtService.signAsync(
        {},
        { subject: userId, jwtid: entryId },
      );
    } catch (_) {
      throw new RefreshTokenSignException();
    }
  }

  public async verify(refreshToken: string) {
    try {
      return await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken,
      );
    } catch (_) {
      throw new RefreshTokenVerifyException();
    }
  }
}
