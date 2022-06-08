// global
import { plainToClass } from 'class-transformer';
import {
  IsAscii,
  IsPort,
  IsUrl,
  Length,
  Matches,
  validateSync,
} from 'class-validator';

export class Env {
  @IsPort()
  HTTP_PORT: string;

  @IsUrl({ require_protocol: false, require_tld: false })
  USERS_SERVICE_GRPC_URL: string;

  @Length(12)
  JWT_SECRET: string;

  @Matches(/[1-9]+\d*[m|s|h|d]/)
  JWT_EXPIRES_IN: string;

  @IsAscii()
  @Length(8, 32)
  TOKEN_COOKIE_NAME: string;
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
