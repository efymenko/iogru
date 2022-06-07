import { applyDecorators } from '@nestjs/common';
import { Matches } from 'class-validator';

/**
 * - only contains `alphanumeric` characters, `underscore` and `dot`.
 * - underscore and dot can't be at the end or start of a username.
 * - underscore and dot can't be next to each other.
 * - underscore or dot can't be used multiple times in a row.
 * - number of characters must be between `8` to `32`
 *
 * @true user_name user.name
 * @false _username username_ .username username.
 * @false user_.name
 * @false user__name
 */
export const IsUsername = applyDecorators(
  Matches(/^(?=[a-zA-Z0-9._]{8,32}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
);
