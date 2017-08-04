export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging: boolean | Function;
  force: boolean;
  timezone: string;
  maxConcurrentQueries: number;
  pool: {
    max: number,
    min: number,
    idle: number
  };
}

export const databaseConfig: DatabaseConfig = {
  username: 'sa',
  password: '123',
  database: 'LinkReview',
  host: '192.168.1.40',
  port: 1433,
  dialect: 'mssql',
  logging: true,  // use for debug and develop only . Should be 'false' in production mode
  force: true,
  timezone: '+00:00',
  maxConcurrentQueries: 100, // default ---> 50
  pool: {
    max: 5000,
    min: 0,
    idle: 10000
  }

};
