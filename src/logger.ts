import { format, createLogger, transports, Logger} from "winston";
import "winston-daily-rotate-file";

const { timestamp, combine, errors, json } = format;

// const loggerFileLocation = process.env.SIMPLE_LOGGER_FILE_LOCATION || "logs/log.json";
// const loggerFileMaxSize = process.env.SIMPLE_LOGGER_FILE_MAX_SIZE || "20m";
// const loggerDatePattern = process.env.SIMPLE_LOGGER_FILE_DATE_PATTERN || "yyyy-MM-dd.";
// const loggerMaxFiles = process.env.SIMPLE_LOGGER_MAX_FILES || "14d";
// const loggerZippedArchive = Boolean(process.env.SIMPLE_LOGGER_ZIPPED_ARCHIVE || "false");
// const loggerLevel = process.env.SIMPLE_LOGGER_LEVEL || "http";

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

