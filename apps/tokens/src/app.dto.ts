import {
  Footprint,
  IssueRefreshTokenRequest,
  ResolveTokensRequest,
  RevokeTokenRequest,
  UserPayload,
} from '@iogru/protos/tokens.service.v1';
import { Type } from 'class-transformer';
import {
  IsIP,
  IsJWT,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UserPayloadDto implements UserPayload {
  @IsMongoId()
  userId: string;
}

export class FootprintDto implements Footprint {
  @IsString()
  userAgent: string;

  @IsIP('4')
  ipv4: string;
}

export class RevokeTokenDto implements RevokeTokenRequest {
  @IsJWT()
  refreshToken: string;

  @IsMongoId()
  tokenId: string;

  @IsNotEmpty()
  @IsString()
  footprint: FootprintDto;
}

export class ResolveTokensDto implements ResolveTokensRequest {
  @IsOptional()
  @IsJWT()
  accessToken?: string;

  @IsOptional()
  @IsJWT()
  refreshToken?: string;

  @ValidateNested()
  @Type(() => FootprintDto)
  footprint: FootprintDto;
}

export class IssueRefreshTokenDto implements IssueRefreshTokenRequest {
  @ValidateNested()
  @Type(() => UserPayloadDto)
  toSign: UserPayloadDto;

  @ValidateNested()
  @Type(() => FootprintDto)
  footprint: FootprintDto;
}
