import {describe, test} from '@jest/globals';
import { createWriteStream } from 'fs';

import { LoggerOptions, initLogger, level } from '../src';
import { loggerOptionsRotated, loggerOptionsStream } from '../src';

describe("Simple Logger E2E test", () => {

  test("Has to write to the console", async ()=> {
    
    const cfg: LoggerOptions = {
      loggerService: "TestLogger",
      loggerLevel: level.http,   
    };
    
    const logger = initLogger(cfg);

    logger.info("Test Info logger, Transport - console");
  });

  test("Has to write to the stream", async ()=> {
    
    const wrStream = createWriteStream('logs/logStream.txt');
    const logStream: loggerOptionsStream = {
      stream: wrStream,
    }; 


    const cfg: LoggerOptions = {
      loggerService: "TestLogger",
      loggerLevel: level.http,   
      loggerOptionsStream: logStream,
    };
    
    const logger = initLogger(cfg);

    logger.info("Test Info logger, Transport - stream");
  });

  test("Has to write to the rotated file", async ()=> {
    
    const logRotated: loggerOptionsRotated = {
      fullFilename: 'logs/logRotated.txt',
      datePattern: 'yyyy-MM-dd.',
      fileMaxSize: '20m',
      maxFiles: '14d',
      zippedArchive: 'true',
    };

    const cfg: LoggerOptions = {
      loggerService: "TestLogger",
      loggerLevel: level.http,   
      loggerOptionsRotated: logRotated,
    };
    
    const logger = initLogger(cfg);

    logger.info("Test Info logger, Transport - rotated");
  });

});