import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenSignException,
  AccessTokenVerifyException,
} from './exceptions/access-token.exceptions';
import { AccessTokenPayload } from './types/access-token-payload.type';
import { ToSignAccessToken } from './types/to-sign-access-token.type';

@Injectable()
export class AccessTokensService {
  constructor(private readonly jwtService: JwtService) {}

  public async verify(accessToken: string) {
    try {
      return await this.jwtService.verifyAsync<AccessTokenPayload>(accessToken);
    } catch (_) {
      throw new AccessTokenVerifyException();
    }
  }

  public async sign(toSign: ToSignAccessToken) {
    const { userId } = toSign;
    try {
      return await this.jwtService.signAsync({}, { subject: userId });
    } catch (_) {
      throw new AccessTokenSignException();
    }
  }
}
