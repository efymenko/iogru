// global
import { IsPort, IsUrl, Length, Matches, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class Env {
  @IsUrl({ require_protocol: false, require_tld: false })
  GRPC_URL: string;

  @IsPort()
  HTTP_PORT: string;

  @IsUrl({ protocols: ['mongodb'], require_tld: false })
  MONGO_URI: string;

  @Length(8, 32)
  ACCESS_TOKEN_SECRET: string;

  @Length(8, 32)
  REFRESH_TOKEN_SECRET: string;

  @Matches(/[1-9]+\d*[m|s|h|d]/)
  ACCESS_TOKEN_EXPIRES_IN: string;

  @Matches(/[1-9]+\d*[m|s|h|d]/)
  REFRESH_TOKEN_EXPIRES_IN: string;
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
