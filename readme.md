## Simple Logger

A simple logger for Nodejs applications.

<p>
  <a href="https://www.npmjs.com/package/@ekarpovs/simple-logger" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@ekarpovs/simple-logger.svg">
  </a>
  <a href="https://github.com/ekarpovs/simple-logger#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ekarpovs/simple-logger/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ekarpovs/simple-logger/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

### Installation
```bash
  npm install @ekarpovs/simple-logger
```
### Usage
```

import { initLogger, level, LoggerOptions, loggerOptionsRotated } from '@ekarpovs/simple-logger';

// Possible cases of the logger initialization:
// 1. Logging to the console:
const loggerConfig: LoggerOptions = {
  loggerService: <your-app-name>,
  loggerLevel: level.http,
};

// 2. Logging to a stream (file for example):
const wrStream = createWriteStream(<path and log file name>);
const logStream: loggerOptionsStream = {
  stream: wrStream,
};
const loggerConfig: LoggerOptions = {
  loggerService: <your-app-name>,
  loggerLevel: level.http,
  loggerOptionsRotated: logStream,
};

// 2. Logging to a local rotated file:
const logRotated: loggerOptionsRotated = {
  fullFilename: <path and log files prefix  name>,
  datePattern: <date pattern>,
  fileMaxSize: <max file size>,
  maxFiles: <max number of the log files>,
  zippedArchive: "true/false",
};

const loggerConfig: LoggerOptions = {
  loggerService: <your-app-name>,
  loggerLevel: level.http,
  loggerOptionsRotated: logRotated,
};

const logger = initLogger(loggerConfig);

// Usage
logger.info("Test Info logger");
```
