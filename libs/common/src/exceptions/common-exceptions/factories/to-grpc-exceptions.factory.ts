import { ExceptionsTransformFactory } from '@iogru/common';
import {
  GrpcRootException,
  InvalidArgumentGrpcException,
  UnknownGrpcException,
} from '../../grpc-exceptions';
import { CommonRootException } from '../common-root.exception';
import { InvalidArgumentException } from '../common.exceptions';

export class FromCommonToGrpcExceptionsTransformFactory
  implements ExceptionsTransformFactory<CommonRootException, GrpcRootException>
{
  public transform(err: CommonRootException) {
    const { constructor, message } = err;

    switch (constructor?.name) {
      case InvalidArgumentException.name:
        return new InvalidArgumentGrpcException(message);

      default:
        return new UnknownGrpcException(message);
    }
  }
}
