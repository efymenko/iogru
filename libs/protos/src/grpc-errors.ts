import { RpcException } from '@nestjs/microservices';
import { GrpcStatusCodes } from './grpc-error-codes';

export class InternalRpcException extends RpcException {
  constructor() {
    super({ message: '', code: GrpcStatusCodes.Internal });
  }
}

export class NotFoundRpcException extends RpcException {
  constructor() {
    super({ message: '', code: GrpcStatusCodes.NotFound });
  }
}

export class UnauthenticatedRpcException extends RpcException {
  constructor() {
    super({ message: '', code: GrpcStatusCodes.Unauthenticated });
  }
}

export class AlreadyExistsRpcException extends RpcException {
  constructor() {
    super({ message: '', code: GrpcStatusCodes.AlreadyExists });
  }
}
