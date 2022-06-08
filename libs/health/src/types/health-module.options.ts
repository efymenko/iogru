import { Type } from '@nestjs/common';

export type HealthModuleOptions = {
  logger?: string | symbol | Type;
};
