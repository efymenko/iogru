import { GrpcOptions, Transport } from '@nestjs/microservices';
import { toString } from 'app-root-path';
import { join } from 'path';
import { protobufPackage as usersPackage } from './interfaces/users.service.v1';

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
  UsersService: {
    fileName: 'users.service.v1.proto',
    packageName: usersPackage,
  },
} as const;
