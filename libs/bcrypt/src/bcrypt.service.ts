import { Inject, Injectable } from '@nestjs/common';
import { BcryptOptions } from './bcrypt.module';
import * as bcrypt from 'bcrypt';
import { BCRYPT_OPTIONS } from './bcrypt.options';

@Injectable()
export class BcryptService {
  constructor(
    @Inject(BCRYPT_OPTIONS) private readonly options: BcryptOptions,
  ) {}

  hashSync = (data: string): string => {
    return bcrypt.hashSync(data, this.options.saltRounds);
  };

  compareSync = (data: string, encrypted: string): boolean => {
    return bcrypt.compareSync(data, encrypted);
  };
}
