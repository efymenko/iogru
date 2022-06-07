import { Injectable, OnModuleInit } from '@nestjs/common';
import { BcryptOptions, BCRYPT_OPTIONS } from './bcrypt.module';
import * as bcrypt from 'bcrypt';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class BcryptService implements OnModuleInit {
  private options: BcryptOptions;

  constructor(private readonly ref: ModuleRef) {}

  onModuleInit() {
    this.options = this.ref.get(BCRYPT_OPTIONS);
  }

  hashSync = (data: string): string => {
    return bcrypt.hashSync(data, this.options.saltRounds);
  };

  compareSync = (data: string, encrypted: string): boolean => {
    return bcrypt.compareSync(data, encrypted);
  };
}
