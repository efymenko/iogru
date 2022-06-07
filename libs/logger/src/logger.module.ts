import { DynamicModule, Module, Scope } from '@nestjs/common';
import { createWinstonLogger } from './drivers';
import { Driver } from './driver.token';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
  public static winston(domain: string): DynamicModule {
    const driver = createWinstonLogger(domain);
    return {
      global: true,
      module: LoggerModule,
      providers: [
        {
          provide: Driver,
          useValue: driver,
        },
        {
          provide: LoggerService,
          useClass: LoggerService,
          scope: Scope.TRANSIENT,
        },
      ],
      exports: [LoggerService],
    };
  }
}
