import { GrpcStatusCodes } from '@iogru/protos';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class RpcExceptionFilter extends BaseExceptionFilter {
  catch(err: Record<string, unknown>, host: ArgumentsHost) {
    if ('code' in err && 'details' in err) {
      const httpErr = grpcToHttpException(
        err.code as number,
        err.details as string,
      );
      super.catch(httpErr, host);
    } else {
      super.catch(err, host);
    }
  }
}

function grpcToHttpException(code: number, message?: string) {
  switch (code) {
    case GrpcStatusCodes.NotFound:
      return new NotFoundException(message);
    case GrpcStatusCodes.InvalidArgument:
      return new BadRequestException(message);
    case GrpcStatusCodes.Internal:
    default:
      return new InternalServerErrorException(message);
  }
}
