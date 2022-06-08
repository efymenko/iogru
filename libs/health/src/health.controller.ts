import { LoggerService } from '@iogru/logger';
import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  DiskHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { HealthOptions } from './health-options.token';
import { HealthModuleOptions } from './types';

@Controller('health')
export class HealthController implements OnModuleInit {
  private logger?: LoggerService;

  constructor(
    @Inject(HealthOptions) private readonly options: HealthModuleOptions,
    private readonly health: HealthCheckService,
    private readonly mongoose: MongooseHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly ref: ModuleRef,
  ) {}

  async onModuleInit() {
    const { logger } = this.options;
    if (logger) {
      const contextId = ContextIdFactory.create();
      this.logger = await this.ref.resolve(logger, contextId, {
        strict: false,
      });
    }
  }

  @Get()
  @HealthCheck()
  async check() {
    const checked = await this.health.check([
      () => this.mongoose.pingCheck('database'),
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: 0.95,
        }),
    ]);

    this.logger?.info('HEALTHCHECK', checked);

    return checked;
  }
}
