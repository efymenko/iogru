import { applyDecorators } from '@nestjs/common';
import { Matches } from 'class-validator';

/**
 * - at least one digit.
 * - at least one lowercase character.
 * - at least one uppercase character.
 * - number of characters must be between `8` to `64`
 *
 * @true passworD1
 * @false password1 passworD
 */
export const IsPassword = applyDecorators(
  Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/),
);
