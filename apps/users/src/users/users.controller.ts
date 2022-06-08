// local
import { UsersService } from './users.service';
import {
  CreateUserDto,
  DeleteUserDto,
  DestroyUserDto,
  FindUserDto,
  FindUsersDto,
  LoginUserDto,
  UpdateUserDto,
} from './user.dto';

// libs
import { RpcValidationPipe } from '@iogru/common';
import {
  UsersServiceController,
  USERS_SERVICE_NAME,
} from '@iogru/protos/users.service.v1';

// global
import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { UsePipes } from '@nestjs/common';

@UsePipes(RpcValidationPipe)
@GrpcService()
export class UsersController implements UsersServiceController {
  constructor(private readonly service: UsersService) {}

  @GrpcMethod(USERS_SERVICE_NAME)
  async create(request: CreateUserDto) {
    return this.service.create(request);
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  update(request: UpdateUserDto) {
    const { id, ...toUpdate } = request;
    return this.service.update(id, toUpdate);
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  findById(request: FindUserDto) {
    const { id } = request;
    return this.service.findById(id);
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  find(request: FindUsersDto) {
    const { limit, bookmark } = request;
    return this.service.find(limit, bookmark);
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  delete(request: DeleteUserDto) {
    const { id } = request;
    return this.service.delete(id);
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  destroy(request: DestroyUserDto) {
    const { id } = request;
    return this.service.destroy(id);
  }

  @GrpcMethod(USERS_SERVICE_NAME)
  login(request: LoginUserDto) {
    return this.service.login(request);
  }
}
