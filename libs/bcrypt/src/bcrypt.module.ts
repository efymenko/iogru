import { DynamicModule, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

export const BCRYPT_OPTIONS = Symbol('Bcrypt options');

export type BcryptOptions = { saltRounds: number };

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {
  static register(options: BcryptOptions): DynamicModule {
    return {
      module: BcryptModule,
      providers: [
        {
          provide: BCRYPT_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
