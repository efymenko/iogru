import {
  Injectable,
  LoggerService as ILoggerService,
  Inject,
} from '@nestjs/common';
import { Driver } from './driver.token';
import { IDriver, LogLevel, Message } from './types';
import { Metadata } from './types/metadata.type';

@Injectable()
export class LoggerService implements ILoggerService {
  private defaultMetadata: Metadata;

  private _log(level: LogLevel, message: Message, metadata?: Metadata) {
    this.driver.log(level, message, { ...this.defaultMetadata, ...metadata });
  }

  constructor(@Inject(Driver) private readonly driver: IDriver) {}

  log(message: Message, metadata?: Metadata) {
    this._log('trace', message, metadata);
  }

  debug(message: Message, metadata?: Metadata) {
    this._log('debug', message, metadata);
  }

  info(message: Message, metadata?: Metadata) {
    this._log('info', message, metadata);
  }

  warn(message: Message, metadata?: Metadata) {
    this._log('warn', message, metadata);
  }

  error(message: Message, metadata?: Metadata) {
    this._log('error', message, metadata);
  }

  crit(message: Message, metadata?: Metadata) {
    this._log('crit', message, metadata);
  }

  setMetadata(metadata: Metadata) {
    this.defaultMetadata = metadata;
  }
}
