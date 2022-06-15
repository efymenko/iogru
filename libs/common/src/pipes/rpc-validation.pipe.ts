import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { InvalidArgumentGrpcException } from '../exceptions/grpc-exceptions';

@Injectable()
export class GrpcValidationPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (metatype) {
      const instance = plainToInstance(metatype, value, {
        enableImplicitConversion: true,
      });

      const errors = validateSync(instance, { whitelist: true });

      if (errors.length) {
        throw new InvalidArgumentGrpcException(errors.toString());
      }
    }
    return value;
  }
}
