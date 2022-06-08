// local
import { AuthService } from './auth.service';

// global
import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(ctx: ExecutionContext): true {
    const http = ctx.switchToHttp();

    const req = http.getRequest();
    const res = http.getResponse();

    const token = this.authService.getToken(req);

    if (!token) {
      throw new UnauthorizedException('Missing authentication token.');
    }

    let payload;
    try {
      payload = this.authService.verify(token);
    } catch (_) {
      throw new UnauthorizedException('Token is not valid');
    }

    const { iss } = payload;

    const signed = this.authService.sign(iss);

    this.authService.setToken(signed, res);

    req.userId = iss;

    return true;
  }
}

export const Auth = () => applyDecorators(UseGuards(AuthGuard));
