import {describe, test} from '@jest/globals';

import { LoggerOptions, initLogger, level } from '../';

describe("Simple Logger E2E test", () => {

  test("Has to write to a log", async ()=> {

    const cfg: LoggerOptions = {
      loggerFileLocation: "logs/log.json",
      loggerFileMaxSize: "20m",
      loggerDatePattern: "yyyy-MM-dd.",
      loggerMaxFiles: "14d",
      loggerZippedArchive: "true",
      loggerLevel: level.http,   
    };
    
    const logger = initLogger(cfg);

    logger.info("Test Info logger");
  });
});