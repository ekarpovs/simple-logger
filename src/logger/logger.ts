import { format, createLogger, Logger} from "winston";
import "winston-daily-rotate-file";

import { transportFactory } from "./factory";
import { loggerOptionsHttp, loggerOptionsRotated, loggerOptionsStream } from "./transports";

const { timestamp, combine, errors, json } = format;

export enum level {
  error = 'error',
  warn = 'warn',
  info = 'info',
  http = 'http',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
};

export type LoggerOptions = {
  loggerService?: string;
  loggerLevel: string;
  loggerOptionsStream?: loggerOptionsStream;
  loggerOptionsRotated?: loggerOptionsRotated;
  loggerOptionsHttp?: loggerOptionsHttp;
};

export const initLogger = (cfg: LoggerOptions): Logger => {
  const logger = createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    level: cfg.loggerLevel,
    defaultMeta: {
      service: cfg.loggerService || "SimpleLogger",
    },
  });
  logger.add(transportFactory(cfg));

  return logger;
};
