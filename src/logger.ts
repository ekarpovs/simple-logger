import { format, createLogger, transports, Logger} from "winston";
import "winston-daily-rotate-file";

const { timestamp, combine, errors, json } = format;

export enum level{
  error = 'error',
  warn = 'warn',
  info = 'info',
  http = 'http',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
}

export type LoggerOptions = {
  loggerFileLocation: string;
  loggerFileMaxSize: string;
  loggerDatePattern: string;
  loggerMaxFiles: string;
  loggerZippedArchive: boolean;
  loggerLevel: level;
};

export const initLogger = (cfg: LoggerOptions): Logger => {
  const logTransports = [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}}`;
        })
      ),
    }),
    new(transports.DailyRotateFile)({
      filename: cfg.loggerFileLocation,
      datePattern: cfg.loggerDatePattern,
      zippedArchive: cfg.loggerZippedArchive,
      maxSize: cfg.loggerFileMaxSize,
      maxFiles: cfg.loggerMaxFiles,
      format: format.combine(format.json()),
    }),
  ];
  
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: logTransports,
    level: cfg.loggerLevel,
  });
};

