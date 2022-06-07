import { Message, Metadata, LogLevel } from '.';

export interface IDriver {
  log(level: LogLevel, message: Message, metadata?: Metadata): void;
}
