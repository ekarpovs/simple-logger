import "winston-daily-rotate-file";

import winston from "winston";

import { LoggerOptions } from "./logger";
import { transportConsole, transportHttp, transportStream } from "./transports";
import { transportDailyRotated } from "./transports/daily-rotated";

export const transportFactory = (cfg: LoggerOptions): winston.transport => {

  if (cfg.loggerOptionsStream) {
    return transportStream(cfg.loggerOptionsStream);
  } else if (cfg.loggerOptionsHttp) {
    return transportHttp(cfg.loggerOptionsHttp);
  } else if (cfg.loggerOptionsRotated) {
    return transportDailyRotated(cfg.loggerOptionsRotated);
  }
  return transportConsole();
};
