import { RpcException } from '@nestjs/microservices';
import { GrpcStatusCodes } from './grpc-error-codes';

export class GrpcException extends RpcException {
  constructor(
    readonly message: string,
    readonly code: typeof GrpcStatusCodes[keyof typeof GrpcStatusCodes],
  ) {
    super({ message, code });
  }
}

export class InternalRpcException extends GrpcException {
  constructor() {
    super('', GrpcStatusCodes.Internal);
  }
}

export class NotFoundRpcException extends GrpcException {
  constructor() {
    super('', GrpcStatusCodes.NotFound);
  }
}

export class UnauthenticatedRpcException extends GrpcException {
  constructor() {
    super('', GrpcStatusCodes.Unauthenticated);
  }
}

export class AlreadyExistsRpcException extends GrpcException {
  constructor() {
    super('', GrpcStatusCodes.AlreadyExists);
  }
}
