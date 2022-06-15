import { GrpcOptions, Transport } from '@nestjs/microservices';
import { toString } from 'app-root-path';
import { join } from 'path';
import {
  protobufPackage as tokensPackage,
  TOKENS_SERVICE_NAME,
} from './interfaces/tokens.service.v1';
import {
  protobufPackage as usersPackage,
  USERS_SERVICE_NAME,
} from './interfaces/users.service.v1';

type Options = {
  name: ProtoService;
} & ({ url: string } | { port: string });

const PROTOS_DIR = join(toString(), 'protos');

export const createGrpcOptions = (
  createOptions: Options,
): GrpcOptions & { name: string } => {
  const { name } = createOptions;

  const service = ProtoServices[name];

  const path = join(PROTOS_DIR, service.fileName);

  const url =
    'url' in createOptions
      ? createOptions.url
      : `localhost:${createOptions.port}`;

  return {
    name,
    transport: Transport.GRPC,
    options: {
      package: service.packageName,
      protoPath: path,
      url,
    },
  };
};

type ProtoService = keyof typeof ProtoServices;

const ProtoServices = {
  [USERS_SERVICE_NAME]: {
    fileName: 'users.service.v1.proto',
    packageName: usersPackage,
  },
  [TOKENS_SERVICE_NAME]: {
    fileName: 'tokens.service.v1.proto',
    packageName: tokensPackage,
  },
} as const;
