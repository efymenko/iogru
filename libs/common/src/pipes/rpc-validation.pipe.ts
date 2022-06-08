import { GrpcStatusCodes } from '@iogru/protos';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class RpcValidationPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    if (metatype) {
      const instance = plainToInstance(metatype, value, {
        enableImplicitConversion: true,
      });
      const errors = validateSync(instance, { whitelist: true });

      if (errors.length) {
        throw new RpcException({
          message: errors.toString(),
          code: GrpcStatusCodes.InvalidArgument,
        });
      }
    }
    return value;
  }
}
