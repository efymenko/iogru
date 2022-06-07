import { Metadata } from '@grpc/grpc-js';
import {
  UsersServiceController,
  USERS_SERVICE_NAME,
} from '@iogru/protos/users.service.v1';
import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import {
  CreateUserDto,
  DeleteUserDto,
  DestroyUserDto,
  FindUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './user.dto';
import { UsersService } from './users.service';

@GrpcService()
export class UsersController implements UsersServiceController {
  constructor(private readonly service: UsersService) {}

  @GrpcMethod(USERS_SERVICE_NAME)
  async create(request: CreateUserDto, metadata?: Metadata) {
    return this.service.create(request);
  }
  update(request: UpdateUserDto, metadata?: Metadata) {
    const { id, ...toUpdate } = request;
    return this.service.update(id, toUpdate);
  }
  findById(request: FindUserDto, metadata?: Metadata) {
    const { id } = request;
    return this.service.findById(id);
  }
  delete(request: DeleteUserDto, metadata?: Metadata) {
    const { id } = request;
    return this.service.delete(id);
  }
  destroy(request: DestroyUserDto, metadata?: Metadata) {
    const { id } = request;
    return this.service.destroy(id);
  }
  login(request: LoginUserDto, metadata?: Metadata) {
    return this.service.login(request);
  }
}
