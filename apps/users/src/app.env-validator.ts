import { plainToClass } from 'class-transformer';
import { IsPort, IsUrl, validateSync } from 'class-validator';

export class Env {
  @IsPort()
  GRPC_PORT: string;

  @IsPort()
  HTTP_PORT: string;

  @IsUrl({ protocols: ['mongodb'], require_tld: false })
  MONGO_URI: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(Env, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
