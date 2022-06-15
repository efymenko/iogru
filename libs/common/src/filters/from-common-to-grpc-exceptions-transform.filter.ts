import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { createExceptionsTransformFilter } from '../exceptions-transform-factory';
import { FromCommonToGrpcExceptionsTransformFactory } from '../exceptions/common-exceptions';
import { GrpcRootException } from '../exceptions/grpc-exceptions';

export const FromCommonToGrpcExceptionsTransformFilter =
  createExceptionsTransformFilter(
    GrpcRootException,
    new FromCommonToGrpcExceptionsTransformFactory(),
    BaseRpcExceptionFilter,
  );
