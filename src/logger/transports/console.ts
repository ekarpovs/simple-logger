import winston, { format, transports } from "winston";

export const transportConsole = (): winston.transport => {
  return new transports.Console({
    format: format.combine(
      format.colorize(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  });
};
  