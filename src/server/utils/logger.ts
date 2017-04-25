import * as cluster from 'cluster';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import { configs } from '../../configs/index';
import { transports, Logger } from 'winston';
import { Request, Response } from 'express';

const config = configs.getLoggingConfig();
config.file.filename = `${path.join(config.directory, '../logs')}/${config.file.filename}`;

if (cluster.isMaster) {
  mkdirp.sync(path.join(config.directory, '../logs'));
}

export const logging = new Logger({
  transports: [
    new transports.File(config.file),
    new transports.Console(config.console)
  ],
  exitOnError: false
});

export const skipping = (req: Request, res: Response): boolean => {
  return res.statusCode >= 200;
};

export const streaming = {
  write: (message: string, encoding: string): void => {
    logging.info(message);
  }
};
