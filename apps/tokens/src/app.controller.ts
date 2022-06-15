import {
  FromCommonToGrpcExceptionsTransformFilter,
  GrpcValidationPipe,
  InvalidArgumentException,
  PermissionDeniedException,
} from '@iogru/common';
import {
  IssueRefreshTokenResponse,
  ResolveTokensResponse,
  RevokeTokenRespone,
  TokensServiceController,
  TOKENS_SERVICE_NAME,
} from '@iogru/protos/tokens.service.v1';
import { Controller, UseFilters, UsePipes } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AccessTokensService } from './access-tokens/access-tokens.service';
import {
  IssueRefreshTokenDto,
  ResolveTokensDto,
  RevokeTokenDto,
} from './app.dto';
import { RefreshTokensService } from './refresh-tokens/refresh-tokens.service';
import { TokenEntriesService } from './token-entries/token-entries.service';

import { FromAccessTokenToGrpcExceptionsTransformFilter } from './access-tokens/exceptions/filters/from-access-token-to-grpc-exceptions.filter';
import { FromTokenEntryToGrpcExceptionsTransformFilter } from './token-entries/exceptions/filters/from-token-entry-to-grpc-exception.filter';
import { FromRefreshTokenToGrpcExceptionsTransformFilter } from './refresh-tokens/exceptions/filters/from-refresh-token-to-grpc-exceptions.filter';
import { RefreshTokenIsRevoked } from './token-entries/exceptions/token-entry.exceptions';

@Controller()
@UsePipes(GrpcValidationPipe)
@UseFilters(
  FromAccessTokenToGrpcExceptionsTransformFilter,
  FromRefreshTokenToGrpcExceptionsTransformFilter,
  FromTokenEntryToGrpcExceptionsTransformFilter,
  FromCommonToGrpcExceptionsTransformFilter,
)
export class AppController implements TokensServiceController {
  constructor(
    private readonly accessService: AccessTokensService,
    private readonly refreshService: RefreshTokensService,
    private readonly entriesService: TokenEntriesService,
  ) {}
  @GrpcMethod(TOKENS_SERVICE_NAME)
  async revoke(request: RevokeTokenDto): Promise<RevokeTokenRespone> {
    const { refreshToken, footprint, tokenId } = request;
    const { jti, sub } = await this.refreshService.verify(refreshToken);
    const { isRevoked } = await this.entriesService.findById(jti);

    if (isRevoked) {
      throw new RefreshTokenIsRevoked();
    }

    const { userId } = await this.entriesService.findById(tokenId);

    if (sub !== userId) {
      throw new PermissionDeniedException();
    }

    this.entriesService.leave(jti, footprint);
    this.entriesService.revoke(tokenId);

    return {
      payload: {
        userId: userId,
      },
    };
  }

  @GrpcMethod(TOKENS_SERVICE_NAME)
  public async resolve(
    request: ResolveTokensDto,
  ): Promise<ResolveTokensResponse> {
    const { accessToken, refreshToken, footprint } = request;

    let needToIssueAnAccessToken = false;

    if (accessToken) {
      try {
        const { sub } = await this.accessService.verify(accessToken);
        return { accessToken, refreshToken, payload: { userId: sub } };
      } catch (_) {
        needToIssueAnAccessToken = true;
      }
    }

    if (refreshToken) {
      if (!accessToken || needToIssueAnAccessToken) {
        const { jti, sub } = await this.refreshService.verify(refreshToken);
        const { isRevoked } = await this.entriesService.findById(jti);

        if (isRevoked) {
          throw new RefreshTokenIsRevoked();
        }

        this.entriesService.leave(jti, footprint);
        const accessToken = await this.accessService.sign({ userId: sub });

        return { accessToken, refreshToken, payload: { userId: sub } };
      }
    }

    throw new InvalidArgumentException();
  }

  @GrpcMethod(TOKENS_SERVICE_NAME)
  public async issue(
    request: IssueRefreshTokenDto,
  ): Promise<IssueRefreshTokenResponse> {
    const { toSign, footprint } = request;
    const { userId } = toSign;

    const entryId = await this.entriesService.create({ userId, footprint });

    const refreshToken = await this.refreshService.sign({ userId, entryId });

    const accessToken = await this.accessService.sign({ userId });

    return { accessToken, refreshToken };
  }
}
