import { createExceptionsTransformFilter } from '@iogru/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { AccessTokenRootException } from '../access-token-root.exception';
import { AccessTokensTransformFactory } from '../factories/to-grpc-exceptions.factory';

export const FromAccessTokenToGrpcExceptionsTransformFilter =
  createExceptionsTransformFilter(
    AccessTokenRootException,
    new AccessTokensTransformFactory(),
    BaseRpcExceptionFilter,
  );
