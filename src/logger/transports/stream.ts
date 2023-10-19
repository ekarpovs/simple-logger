import * as nodeStream from 'node:stream';
import winston, { format, transports } from "winston";

export type loggerOptionsStream = {
  stream: nodeStream.Writable;
};

export const transportStream = (cfg: loggerOptionsStream): winston.transport => {
  return new transports.Stream({
    stream: cfg.stream,
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message, service }) => {
        return `[${timestamp}] ${service} ${level}: ${message}`;
      }),
    ),
  });
};
