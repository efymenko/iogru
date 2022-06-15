import {
  ExceptionsTransformFactory,
  GrpcRootException,
  UnauthenticatedGrpcException,
  UnknownGrpcException,
} from '@iogru/common';
import {
  AccessTokenSignException,
  AccessTokenVerifyException,
} from '../access-token.exceptions';
import { AccessTokenRootException } from '../access-token-root.exception';

export class AccessTokensTransformFactory
  implements
    ExceptionsTransformFactory<AccessTokenRootException, GrpcRootException>
{
  public transform(error: AccessTokenRootException): GrpcRootException {
    const { constructor, message } = error;

    switch (constructor?.name) {
      case AccessTokenVerifyException.name:
        return new UnauthenticatedGrpcException(message);

      case AccessTokenSignException.name:
        return new UnauthenticatedGrpcException(message);

      default:
        return new UnknownGrpcException();
    }
  }
}
