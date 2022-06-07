import { applyDecorators } from '@nestjs/common';
import { Length } from 'class-validator';

const MIN = 1;
const MAX = 512;

/**
 * @optional
 */
export const IsAboutMe = applyDecorators(Length(MIN, MAX));
