/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'iogru';

export interface ResolveTokensRequest {
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  footprint: Footprint | undefined;
}

export interface IssueRefreshTokenRequest {
  toSign: UserPayload | undefined;
  footprint: Footprint | undefined;
}

export interface IssueRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ResolveTokensResponse {
  accessToken: string;
  refreshToken?: string | undefined;
  payload: UserPayload | undefined;
}

export interface RevokeTokenRespone {
  payload: UserPayload | undefined;
}

export interface RevokeTokenRequest {
  refreshToken: string;
  tokenId: string;
  footprint: Footprint | undefined;
}

export interface Footprint {
  userAgent: string;
  ipv4: string;
}

export interface UserPayload {
  userId: string;
}

export const IOGRU_PACKAGE_NAME = 'iogru';

export interface TokensServiceClient {
  resolve(
    request: ResolveTokensRequest,
    metadata?: Metadata,
  ): Observable<ResolveTokensResponse>;

  issue(
    request: IssueRefreshTokenRequest,
    metadata?: Metadata,
  ): Observable<IssueRefreshTokenResponse>;

  revoke(
    request: RevokeTokenRequest,
    metadata?: Metadata,
  ): Observable<RevokeTokenRespone>;
}

export interface TokensServiceController {
  resolve(
    request: ResolveTokensRequest,
    metadata?: Metadata,
  ):
    | Promise<ResolveTokensResponse>
    | Observable<ResolveTokensResponse>
    | ResolveTokensResponse;

  issue(
    request: IssueRefreshTokenRequest,
    metadata?: Metadata,
  ):
    | Promise<IssueRefreshTokenResponse>
    | Observable<IssueRefreshTokenResponse>
    | IssueRefreshTokenResponse;

  revoke(
    request: RevokeTokenRequest,
    metadata?: Metadata,
  ):
    | Promise<RevokeTokenRespone>
    | Observable<RevokeTokenRespone>
    | RevokeTokenRespone;
}

export function TokensServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['resolve', 'issue', 'revoke'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('TokensService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('TokensService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const TOKENS_SERVICE_NAME = 'TokensService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
