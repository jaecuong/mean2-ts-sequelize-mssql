import { logger } from "../../utils/index";
import { models, sequelize } from "../../models/index";
import { ProductAttributes, ProductInstance } from "../../models/interfaces/product-interface";
import { Transaction } from "sequelize";

class ProductService {
  createProduct(productAttributes: ProductAttributes): Promise<ProductInstance> {
    let promise = new Promise<ProductInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Product.create(productAttributes).then((product: ProductInstance) => {
          logger.info(`Created product with name ${productAttributes.name} successful !!!`);
          resolve(product);
        }).catch((error: Error) => {
          logger.error(`Created product with name error = ${error.message}`);
          reject(error);
        });
      });
    });

    return promise;
  }

  retrieveProduct(name: string): Promise<ProductInstance> {
    let promise = new Promise<ProductInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Product.findOne({ where: { name: name } }).then((product: ProductInstance) => {
          if (product) {
            logger.info(`Retrieved product with name ${name} successful !!!`);
          } else {
            logger.info(`Product with name ${name} does not exist.`);
          }
          resolve(product);
        }).catch((error: Error) => {
          logger.error(`Retrieved product with name =  ${name} got error = ${error.message}`);
          reject(error);
        });
      });
    });

    return promise;
  }

  retrieveProducts(): Promise<Array<ProductInstance>> {
    let promise = new Promise<Array<ProductInstance>>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Product.findAll().then((products: Array<ProductInstance>) => {
          logger.info(`Retrieved all products successful !!!`);
          resolve(products);
        }).catch((error: Error) => {
          logger.error(`Retrieved all products error = ${error.message}`);
          reject(error);
        });
      });
    });

    return promise;
  }

  updateProduct(name: string, productAttributes: any): Promise<void> {
    let promise = new Promise<void>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Product.update(productAttributes, { where: { name: name } })
          .then((results: [number, Array<ProductInstance>]) => {
            if (results.length > 0) {
              logger.info(`Updated product with name = ${name} successful !!!`);
            } else {
              logger.info(`Updated product with name = ${name} does not exist.`);
            }
            resolve(null);
          }).catch((error: Error) => {
            logger.error(`Updated product with name = ${name} error = ${error.message}`);
            reject(error);
          });
      });
    });

    return promise;
  }

  deleteProduct(name: string): Promise<void> {
    let promise = new Promise<void>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Product.destroy({ where: { name: name } }).then((afffectedRows: number) => {
          if (afffectedRows > 0) {
            logger.info(`Deleted product with name ${name} successful !!!`);
          } else {
            logger.info(`Product with name ${name} does not exist.`);
          }
          resolve(null);
        }).catch((error: Error) => {
          logger.error(`Deleted product with name ${name} error = ${error.message}`);
          reject(error);
        });
      });
    });

    return promise;
  }
}

export const productService = new ProductService();
