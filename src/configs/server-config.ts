import * as path from 'path';

export interface ServerConfig {
  port: number;
  session: {
    issuer: string,
    secret: string,
    name: string,
    resave: boolean,
    saveUninitialized: boolean,
    proxy: boolean
  };
  apiUrl: string;
  publicPathHtml: string;
  publicPath: string;
}

export const serverConfig: ServerConfig = {
  port: 3000,
  session: {
    issuer: "Pham Nguyen Phi",
    secret: "linkreview-secret-string",
    name: "linkreview-secret-session",
    resave: true,
    saveUninitialized: true,
    proxy: false
  },
  apiUrl: "http://localhost:3000/api/",
  publicPathHtml: path.join(__dirname, '../public/index.html'),
  publicPath: path.join(__dirname, '../public')
};
