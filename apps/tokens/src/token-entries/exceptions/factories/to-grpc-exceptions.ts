import {
  ExceptionsTransformFactory,
  GrpcRootException,
  NotFoundGrpcException,
  ResourceExhaustedGrpcException,
  UnknownGrpcException,
} from '@iogru/common';
import { TokenEntryRootException } from '../token-entry-root.exception';
import {
  RefreshTokenIsRevoked,
  TokenEntryNotFoundException,
} from '../token-entry.exceptions';

export class TokenEntriesTransformFactory
  implements
    ExceptionsTransformFactory<TokenEntryRootException, GrpcRootException>
{
  public transform(error: TokenEntryRootException) {
    const { message, constructor } = error;

    switch (constructor?.name) {
      case RefreshTokenIsRevoked.name:
        return new ResourceExhaustedGrpcException(message);

      case TokenEntryNotFoundException.name:
        return new NotFoundGrpcException(message);

      default:
        return new UnknownGrpcException();
    }
  }
}
