import { GrpcRootException } from './grpc-root.exception';
import { GrpcStatusCodes } from './grpc-status-codes';

export class InternalGrpcException extends GrpcRootException {
  constructor(msg?: string) {
    super(GrpcStatusCodes.Internal, msg);
  }
}

export class NotFoundGrpcException extends GrpcRootException {
  constructor(msg?: string) {
    super(GrpcStatusCodes.NotFound, msg);
  }
}

export class UnauthenticatedGrpcException extends GrpcRootException {
  constructor(msg?: string) {
    super(GrpcStatusCodes.Unauthenticated, msg);
  }
}

export class AlreadyExistsGrpcException extends GrpcRootException {
  constructor(msg?: string) {
    super(GrpcStatusCodes.AlreadyExists, msg);
  }
}

export class UnknownGrpcException extends GrpcRootException {
  constructor(msg?: string) {
    super(GrpcStatusCodes.Unknown, msg);
  }
}

export class ResourceExhaustedGrpcException extends GrpcRootException {
  constructor(msg?: string) {
    super(GrpcStatusCodes.ResourceExhausted, msg);
  }
}

export class InvalidArgumentGrpcException extends GrpcRootException {
  constructor(msg?: string) {
    super(GrpcStatusCodes.InvalidArgument, msg);
  }
}
