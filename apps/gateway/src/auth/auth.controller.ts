// local
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

//libs
import { GrpcStatusCodes } from '@iogru/protos';
import {
  CreateUserRequest,
  LoginUserRequest,
  UsersServiceClient,
} from '@iogru/protos/users.service.v1';

// global
import {
  Body,
  ConflictException,
  Controller,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { catchError, tap, throwError } from 'rxjs';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersServiceClient,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  login(
    @Body() body: LoginUserRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(body).pipe(
      catchError(err =>
        err.code === GrpcStatusCodes.NotFound
          ? throwError(() => new NotFoundException())
          : throwError(() => new InternalServerErrorException()),
      ),
      tap(user => {
        const token = this.authService.sign(user.id);
        this.authService.setToken(token, res);
      }),
    );
  }

  @Post('register')
  register(
    @Body() body: CreateUserRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.create(body).pipe(
      catchError(err =>
        err.code === GrpcStatusCodes.AlreadyExists
          ? throwError(() => new ConflictException())
          : throwError(() => new InternalServerErrorException()),
      ),
      tap(user => {
        const token = this.authService.sign(user.id);
        this.authService.setToken(token, res);
      }),
    );
  }
}
