import { createExceptionsTransformFilter } from '@iogru/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { TokenEntriesTransformFactory } from '../factories/to-grpc-exceptions';
import { TokenEntryRootException } from '../token-entry-root.exception';

export const FromTokenEntryToGrpcExceptionsTransformFilter =
  createExceptionsTransformFilter(
    TokenEntryRootException,
    new TokenEntriesTransformFactory(),
    BaseRpcExceptionFilter,
  );
