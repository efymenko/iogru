// local
import { Auth } from '../auth/auth.guard';
import { UsersService } from './users.service';

// libs
import { RpcExceptionFilter, Id } from '@iogru/common';
import {
  UpdateUserRequest,
  UsersServiceClient,
} from '@iogru/protos/users.service.v1';

// global
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Patch,
  Query,
  UseFilters,
} from '@nestjs/common';
import { bufferCount } from 'rxjs';

@UseFilters(RpcExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersServiceClient,
  ) {}

  @Auth()
  @Patch(':id')
  update(@Id() id: string, @Body() body: Omit<UpdateUserRequest, 'id'>) {
    return this.usersService.update({ id, ...body });
  }

  @Auth()
  @Get(':id')
  findById(@Id() id: string) {
    return this.usersService.findById({ id });
  }

  @Auth()
  @Get()
  find(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('bookmark') bookmark?: string,
  ) {
    return this.usersService.find({ limit, bookmark }).pipe(bufferCount(limit));
  }

  @Auth()
  @Get(':id/delete')
  delete(@Id() id: string) {
    return this.usersService.delete({ id });
  }

  @Auth()
  @Delete(':id')
  destroy(@Id() id: string) {
    return this.usersService.destroy({ id });
  }
}
