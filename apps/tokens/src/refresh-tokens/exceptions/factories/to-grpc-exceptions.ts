import {
  ExceptionsTransformFactory,
  GrpcRootException,
  UnauthenticatedGrpcException,
  UnknownGrpcException,
} from '@iogru/common';
import {
  RefreshTokenSignException,
  RefreshTokenVerifyException,
} from '../refresh-token-exceptions';
import { RefreshTokenRootException } from '../refresh-token-root.exception';

export class RefreshTokensTransformFactory
  implements
    ExceptionsTransformFactory<RefreshTokenRootException, GrpcRootException>
{
  public transform(error: RefreshTokenRootException) {
    const { message, constructor } = error;

    switch (constructor?.name) {
      case RefreshTokenVerifyException.name:
        return new UnauthenticatedGrpcException(message);

      case RefreshTokenSignException.name:
        return new UnauthenticatedGrpcException(message);

      default:
        return new UnknownGrpcException(message);
    }
  }
}
