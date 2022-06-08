import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthOptions } from './health-options.token';
import { HealthController } from './health.controller';
import { HealthModuleOptions } from './types';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {
  public static register(options: HealthModuleOptions): DynamicModule {
    return {
      module: HealthModule,
      providers: [{ provide: HealthOptions, useValue: options }],
    };
  }
}
