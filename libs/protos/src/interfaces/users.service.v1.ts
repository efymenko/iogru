/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'iogru';

export interface UserResponse {
  id: string;
  username: string;
  password: string;
  aboutMe: string;
  phoneNumber: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  aboutMe?: string | undefined;
  phoneNumber?: string | undefined;
}

export interface UpdateUserRequest {
  id: string;
  username?: string | undefined;
  password?: string | undefined;
  aboutMe?: string | undefined;
  phoneNumber?: string | undefined;
}

export interface FindUserRequest {
  id: string;
}

export interface FindUsersRequest {
  limit: number;
  bookmark?: string | undefined;
}

export interface DeleteUserRequest {
  id: string;
}

export interface DestroyUserRequest {
  id: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

export const IOGRU_PACKAGE_NAME = 'iogru';

export interface UsersServiceClient {
  create(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Observable<UserResponse>;

  update(
    request: UpdateUserRequest,
    metadata?: Metadata,
  ): Observable<UserResponse>;

  findById(
    request: FindUserRequest,
    metadata?: Metadata,
  ): Observable<UserResponse>;

  find(
    request: FindUsersRequest,
    metadata?: Metadata,
  ): Observable<UserResponse>;

  delete(
    request: DeleteUserRequest,
    metadata?: Metadata,
  ): Observable<UserResponse>;

  destroy(
    request: DestroyUserRequest,
    metadata?: Metadata,
  ): Observable<UserResponse>;

  login(
    request: LoginUserRequest,
    metadata?: Metadata,
  ): Observable<UserResponse>;
}

export interface UsersServiceController {
  create(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  update(
    request: UpdateUserRequest,
    metadata?: Metadata,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  findById(
    request: FindUserRequest,
    metadata?: Metadata,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  find(
    request: FindUsersRequest,
    metadata?: Metadata,
  ): Observable<UserResponse>;

  delete(
    request: DeleteUserRequest,
    metadata?: Metadata,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  destroy(
    request: DestroyUserRequest,
    metadata?: Metadata,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  login(
    request: LoginUserRequest,
    metadata?: Metadata,
  ): Promise<UserResponse> | Observable<UserResponse> | UserResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'create',
      'update',
      'findById',
      'find',
      'delete',
      'destroy',
      'login',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UsersService', method)(
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
      GrpcStreamMethod('UsersService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USERS_SERVICE_NAME = 'UsersService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
