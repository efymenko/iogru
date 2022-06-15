import {
  Abstract,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Type,
} from '@nestjs/common';
import { ExceptionsTransformFactory } from './exceptions-transform-factory.interface';

export function createExceptionsTransformFilter<From, To>(
  from: Type<From> | Abstract<From>,
  factory: ExceptionsTransformFactory<From, To>,
  base: Type<ExceptionFilter>,
) {
  const decorate = Catch(from);

  const clazz = class extends base {
    catch(err: From, host: ArgumentsHost) {
      const transformed = factory.transform(err);
      return super.catch(transformed, host);
    }
  };

  decorate(clazz);

  if (clazz) {
    return clazz;
  } else {
    throw new Error();
  }
}
