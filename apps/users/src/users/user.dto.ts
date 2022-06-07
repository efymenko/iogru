import { IsMobilePhone, IsMongoId, IsOptional } from 'class-validator';
import {
  CreateUserRequest,
  DeleteUserRequest,
  DestroyUserRequest,
  FindUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from '@iogru/protos/users.service.v1';
import { IsAboutMe, IsPassword, IsUsername } from './is-validator';
import { Id } from './types/id';

/**
 * @property {@link IsUsername username}
 * @property {@link IsPassword password}
 */
export class CreateUserDto implements CreateUserRequest {
  /**
   * @see {@link IsUsername}
   */
  @IsUsername
  username: string;

  /**
   * @see {@link IsPassword}
   */
  @IsPassword
  password: string;

  @IsOptional()
  @IsAboutMe
  aboutMe: string;

  @IsOptional()
  @IsMobilePhone(['ru-RU'])
  phoneNumber: string;
}

export class UpdateUserDto implements UpdateUserRequest {
  @IsMongoId()
  id: Id;

  @IsOptional()
  @IsUsername
  username?: string;

  @IsOptional()
  @IsPassword
  password?: string;

  @IsOptional()
  @IsAboutMe
  aboutMe?: string;

  @IsOptional()
  @IsMobilePhone(['ru-RU'])
  phoneNumber?: string;
}

export class DeleteUserDto implements DeleteUserRequest {
  @IsMongoId()
  id: Id;
}

export class DestroyUserDto implements DestroyUserRequest {
  @IsMongoId()
  id: Id;
}

export class FindUserDto implements FindUserRequest {
  @IsMongoId()
  id: Id;
}

/**
 * @property {@link IsUsername username}
 * @property {@link IsPassword password}
 */
export class LoginUserDto implements LoginUserRequest {
  /**
   * @see {@link IsUsername}
   */
  @IsUsername
  username: string;

  /**
   * @see {@link IsPassword}
   */
  @IsPassword
  password: string;
}
