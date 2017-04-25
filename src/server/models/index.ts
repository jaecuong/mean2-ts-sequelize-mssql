import * as cls from 'continuation-local-storage';
import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import { configs } from '../../configs/index';
import { logger } from '../utils/index';
import { ProductAttributes, ProductInstance } from './interfaces/product-interface';
import { ProfileInstance, ProfileAttributes } from './interfaces/profile-interface';
import { Sequelize } from 'sequelize';

export interface SequelizeModels {
  Product: SequelizeStatic.Model<ProductInstance, ProductAttributes>;
  Profile: SequelizeStatic.Model<ProfileInstance, ProfileAttributes>;
}

class Database {
  private _basename: string;
  private _models: SequelizeModels;
  private _sequelize: Sequelize;

  constructor() {
    this._basename = path.basename(module.filename);
    const dbConfig = configs.getDatabaseConfig();

    if (dbConfig.logging) {
      dbConfig.logging = logger.info;
    }

    (SequelizeStatic as any).cls = cls.createNamespace('sequelize-transaction');
    this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
      dbConfig.password, dbConfig);
    this._models = ({} as any);

    // Comment this code when Debug In VSCODE and modify sourmap to true in tsconfig global
    // UnComment this code in production mode pand modify sourmap to false in tsconfig global
    // fs.readdirSync(__dirname).filter((file: string) => {
    //   return (file !== this._basename) && (file !== 'interfaces');
    // }, (err: Error) => {
    //   console.log(`Error = ${err} `);
    // }).forEach((file: string) => {
    //   const model = this._sequelize.import(path.join(__dirname, file));
    //   this._models[(model as any).name] = model;
    // });

    Object.keys(this._models).forEach((modelName: string) => {
      if (typeof this._models[modelName].associate === 'function') {
        this._models[modelName].associate(this._models);
      }
    });
  }

  getModels() {
    return this._models;
  }

  getSequelize() {
    return this._sequelize;
  }


}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();


// Ping checks that the database server can be connected to. It attempts to connect every second for 60 seconds, before giving up and throwing
// an error back up to the chain.  This function is especially useful when using Docker Compose with a linked DB, which may not always be ready before
// the API server starts
// exports async ping = () => {
//   for (let i = 1; i <= 60; i++) {
//     try {
//       await sequelize.authenticate();
//       return;
//     } catch (e) {
//       console.log(`DB connection attempt #${i} failed, retrying...`);
//       // await delay(1000);
//     }
//   }

//   throw new Error('Couldn't connect to database!');
// }
// https://github.com/sequelize/sequelize/issues/6524
