import { DynamicModule, Module } from '@nestjs/common';
import { BCRYPT_OPTIONS } from './bcrypt.options';
import { BcryptService } from './bcrypt.service';

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
