import { BaseExceptionFilter } from '@nestjs/core';
import { createExceptionsTransformFilter } from '../exceptions-transform-factory';
import { GrpcRootException } from '../exceptions/grpc-exceptions';
import { FromGrpcToHttpExceptionsTransformFactory } from '../exceptions/grpc-exceptions/factories/to-http-exceptions.factory';

export const FromGrpcToHttpExceptionsTransformFilter =
  createExceptionsTransformFilter(
    GrpcRootException,
    new FromGrpcToHttpExceptionsTransformFactory(),
    BaseExceptionFilter,
  );
