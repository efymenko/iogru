import { createExceptionsTransformFilter } from '@iogru/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { RefreshTokensTransformFactory } from '../factories/to-grpc-exceptions';
import { RefreshTokenRootException } from '../refresh-token-root.exception';

export const FromRefreshTokenToGrpcExceptionsTransformFilter =
  createExceptionsTransformFilter(
    RefreshTokenRootException,
    new RefreshTokensTransformFactory(),
    BaseRpcExceptionFilter,
  );
