import * as moment from "moment";

export interface LoggingConfig {
  file: {
    level: string,
    filename: string,
    handleExceptions: boolean,
    json: boolean,
    maxsize: number,
    maxFiles: number,
    colorize: boolean
  };
  console: {
    level: string,
    handleExceptions: boolean,
    json: boolean,
    colorize: boolean,
    timestamp: string
  };
  directory: string;
}

export const loggingConfig: LoggingConfig = {
  file: {
    level: "error",
    filename: "LinkReview.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 100,
    colorize: false
  },
  console: {
    level: "verbose",
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: moment().format('YYYY-MM-DD hh:mm:ss:SSS')
  },
  directory: __dirname
};
