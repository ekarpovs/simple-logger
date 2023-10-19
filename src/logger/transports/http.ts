import winston, { format, transports } from "winston";

export type loggerOptionsHttp = {
  host?: string;
  port?: number;
  path?: string;
};

export const transportHttp = (cfg: loggerOptionsHttp): winston.transport => {
  return new transports.Http({
    host: cfg.host,
    port: cfg.port,
    path: cfg.path,
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message, service }) => {
        return `[${timestamp}] ${service} ${level}: ${message}`;
      })
    )
  });
};