// local
import { Env } from '../app.env-validator';

// global
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Env, true>,
  ) {}

  verify(token: string) {
    return this.jwtService.verify(token);
  }

  sign(userId: string) {
    return this.jwtService.sign({}, { issuer: userId });
  }

  setToken(token: string, res: Response) {
    const TOKEN_COOKIE_NAME = this.configService.get('TOKEN_COOKIE_NAME');
    res.cookie(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  }

  getToken(req: Request): string | undefined {
    const TOKEN_COOKIE_NAME = this.configService.get('TOKEN_COOKIE_NAME');
    return req.cookies[TOKEN_COOKIE_NAME];
  }
}
