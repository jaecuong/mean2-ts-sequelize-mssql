import { databaseConfig, DatabaseConfig } from "./database-config";
import { loggingConfig, LoggingConfig } from "./logging-config";
import { serverConfig, ServerConfig } from "./server-config";
import { statusCodeConfig, StatusCodeConfig } from "./statusCode-config";


class Configs {
  private _databaseConfig: DatabaseConfig;
  private _loggingConfig: LoggingConfig;
  private _serverConfig: ServerConfig;
  private _statusCodeConfig: StatusCodeConfig;

  constructor() {
    this._databaseConfig = databaseConfig;
    this._loggingConfig = loggingConfig;
    this._serverConfig = serverConfig;
    this._statusCodeConfig = statusCodeConfig;
  }

  getDatabaseConfig(): DatabaseConfig {
    return this._databaseConfig;
  }

  getLoggingConfig(): LoggingConfig {
    return this._loggingConfig;
  }

  getServerConfig(): ServerConfig {
    return this._serverConfig;
  }

  getStatusCodeoConfig(): StatusCodeConfig {
    return this._statusCodeConfig;
  }
}

export const configs = new Configs();
