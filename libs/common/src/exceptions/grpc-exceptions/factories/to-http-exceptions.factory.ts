import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionsTransformFactory } from 'libs/common/src/exceptions-transform-factory';
import {
  AlreadyExistsGrpcException,
  InternalGrpcException,
  InvalidArgumentGrpcException,
  NotFoundGrpcException,
  ResourceExhaustedGrpcException,
  UnauthenticatedGrpcException,
  UnknownGrpcException,
} from '../grpc-exceptions';
import { GrpcRootException } from '../grpc-root.exception';

export class FromGrpcToHttpExceptionsTransformFactory
  implements ExceptionsTransformFactory<GrpcRootException, HttpException>
{
  transform(error: GrpcRootException) {
    const { message, constructor } = error;

    switch (constructor?.name) {
      case NotFoundGrpcException.name:
        return new NotFoundException(message);
      case UnauthenticatedGrpcException.name:
        return new ForbiddenException(message);
      case AlreadyExistsGrpcException.name:
        return new ConflictException(message);
      case ResourceExhaustedGrpcException.name:
        return new UnauthorizedException(message);
      case InvalidArgumentGrpcException.name:
        return new BadRequestException(message);
      case InternalGrpcException.name:
      case UnknownGrpcException.name:
      default:
        return new InternalServerErrorException(message);
    }
  }
}
