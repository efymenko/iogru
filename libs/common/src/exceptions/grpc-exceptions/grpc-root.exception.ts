import { RpcException } from '@nestjs/microservices';
import { GrpcStatusCodes } from './grpc-status-codes';

export class GrpcRootException extends RpcException {
  constructor(
    code: typeof GrpcStatusCodes[keyof typeof GrpcStatusCodes],
    message?: string,
  ) {
    super({ message, code });
  }
}
