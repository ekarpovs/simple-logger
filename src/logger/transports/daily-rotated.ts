import winston, { format, transports } from "winston";

export type loggerOptionsRotated = {
  fullFilename: string;
  fileMaxSize: string;
  datePattern: string;
  maxFiles: string;
  zippedArchive: string;
};

export const transportDailyRotated = (cfg: loggerOptionsRotated): winston.transport => {
  return new(transports.DailyRotateFile)({
    filename: cfg.fullFilename,
    datePattern: cfg.datePattern,
    zippedArchive: toBoolean(cfg.zippedArchive),
    maxSize: cfg.fileMaxSize,
    maxFiles: cfg.maxFiles,
    format: format.combine(format.json()
    ),
  });
};

const toBoolean = (dataStr: string): boolean => {
  return !!(dataStr?.toLowerCase?.() === 'true');
};
