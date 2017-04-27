import { logger } from '../../utils/index';
import { models, sequelize } from '../../models/index';
import { ProfileAttributes, ProfileInstance } from '../../models/interfaces/profile-interface';
import { Transaction } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { encrypt, validatePassword } from '../../utils/jwtHelper';


class ProfileService {
  createProfile(profileAttributes: ProfileAttributes): Promise<ProfileInstance> {
    const promise = new Promise<ProfileInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Profile.findOne({ where: { email: profileAttributes.Email } }).then((findProfile: ProfileInstance) => {
          if (findProfile) {
            reject(`Profile with email =  ${profileAttributes.Email} already token`);
          } else {
            // Hash Password before Insert To DB
            // profileAttributes.HashPasswd = bcrypt.hashSync(profileAttributes.Passwd, 10);
            profileAttributes.Passwd = encrypt(profileAttributes.Passwd);

            return models.Profile.create(profileAttributes).then((profileParam: ProfileInstance) => {
              logger.info(`Created profile with email [${profileAttributes.Email}] successful !!!`);
              resolve(profileParam);
            }).catch((error: Error) => {
              reject(`Created profile with email [${profileAttributes.Email}] error = ${error.message}`);
            });
          }
        }).catch((error: Error) => {
          logger.error(`Retrieved profile with email =  ${profileAttributes.Email} got error = ${error.message}`);
          reject(`Retrieved profile with email =  ${profileAttributes.Email} got error = ${error.message}`);
        });

      });
    });

    return promise;
  }

  public retrieveProfile(emailParam: string): Promise<ProfileInstance> {
    const promise = new Promise<ProfileInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Profile.findOne({ where: { Email: emailParam } }).then((profileParam: ProfileInstance) => {
          if (profileParam) {
            logger.info(`Retrieved profile with email ${emailParam} successful !!!`);
          } else {
            logger.info(`Profile with email ${emailParam} does not exist.`);
          }
          resolve(profileParam);
        }).catch((error: Error) => {
          logger.error(`Retrieved profile with email =  ${emailParam} got error = ${error.message}`);
          reject(`Retrieved profile with email =  ${emailParam} got error = ${error.message}`);
        });
      });
    });

    return promise;
  }

  getProfileById(profileIdParam: string): Promise<ProfileInstance> {
    const promise = new Promise<ProfileInstance>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Profile.findOne({ where: { profile_id: profileIdParam } }).then((profile: ProfileInstance) => {
          if (profile) {
            logger.info(`Retrieved profile with email ${profileIdParam} successful !!!`);
          } else {
            logger.info(`Profile with email ${profileIdParam} does not exist.`);
          }
          resolve(profile);
        }).catch((error: Error) => {
          logger.error(`Retrieved profile with email =  ${profileIdParam} got error = ${error.message}`);
          reject(`Retrieved profile with email =  ${profileIdParam} got error = ${error.message}`);
        });
      });
    });

    return promise;
  }

  retrieveProfiles(): Promise<Array<ProfileInstance>> {
    const promise = new Promise<Array<ProfileInstance>>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Profile.findAll().then((profile: Array<ProfileInstance>) => {
          logger.info(`Retrieved all profile successful !!!`);
          resolve(profile);
        }).catch((error: Error) => {
          logger.error(`Retrieved all profile error = ${error.message}`);
          reject(`Retrieved all profile error = ${error.message}`);
        });
      });
    });

    return promise;
  }

  updateProfile(name: string, profileAttributes: any): Promise<void> {
    const promise = new Promise<void>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Profile.update(profileAttributes, { where: { name: name } })
          .then((results: [number, Array<ProfileInstance>]) => {
            if (results.length > 0) {
              logger.info(`Updated profile with name = ${name} successful !!!`);
            } else {
              logger.info(`Updated profile with name = ${name} does not exist.`);
            }
            resolve(null);
          }).catch((error: Error) => {
            logger.error(`Updated profile with name = ${name} error = ${error.message}`);
            reject(`Updated profile with name = ${name} error = ${error.message}`);
          });
      });
    });

    return promise;
  }

  deleteProfile(name: string): Promise<void> {
    const promise = new Promise<void>((resolve: Function, reject: Function) => {
      sequelize.transaction((t: Transaction) => {
        return models.Profile.destroy({ where: { name: name } }).then((afffectedRows: number) => {
          if (afffectedRows > 0) {
            logger.info(`Deleted profile with name ${name} successful !!!`);
          } else {
            logger.info(`Profile with name ${name} does not exist.`);
          }
          resolve(null);
        }).catch((error: Error) => {
          logger.error(`Deleted profile with name ${name} error = ${error.message}`);
          reject(`Deleted profile with name ${name} error = ${error.message}`);
        });
      });
    });

    return promise;
  }
}

export const profileService = new ProfileService();
