import {
  createLogger,
  format,
  LoggerOptions,
  transports as trans,
} from 'winston';
import { LogLevels } from '../log-levels';
import Transport from 'winston-transport';

export const createWinstonLogger = (domain: string): LoggerOptions => {
  const transports: Transport[] = [
    new trans.File({
      filename: `${domain}.error.log`,
      level: 'error',
    }),
    new trans.File({
      filename: `${domain}.log`,
      level: 'info',
    }),
  ];

  if (process.env.NODE_ENV !== 'production') {
    const transport = new trans.Console({
      level: 'trace',
      format: format.combine(format.timestamp(), format.simple()),
      handleExceptions: true,
      handleRejections: true,
    });

    transports.push(transport);
  }

  const options: LoggerOptions = {
    levels: LogLevels,
    level: 'trace',
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: domain },
    exceptionHandlers: [
      new trans.File({ filename: `${domain}.exception.log` }),
    ],
    transports,
  };

  return createLogger(options);
};
