import * as jwt from 'express-jwt';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';
import { configs } from '../../configs/index';

// import { ProfileAttributes, ProfileInstance } from '../models/interfaces/profile-interface';

export const encodeToken = (profileIdParam: string, emailParam: string) => {
  // iss: The issuer of the token
  // sub: The subject of the token
  // aud: The audience of the token
  // exp: This will probably be the registered claim most often used. This will define the expiration in NumericDate value.
  //      The expiration MUST be after the current date/time.
  // nbf: Defines the time before which the JWT MUST NOT be accepted for processing
  // iat: The time the JWT was issued. Can be used to determine the age of the JWT
  // jti: Unique identifier for the JWT. Can be used to prevent the JWT from being replayed. This is helpful for a one time use token.
  const payload = {
    exp: moment().add(14, 'days').unix(),   // expiration date of the token
    iat: moment().unix(),                   // the time the token is generated
    sub: profileIdParam,                    // the subject of the token (the user whom it identifies)
    email: emailParam,
    iss: configs.getServerConfig().session.issuer
  };
  return jwt.encode(payload, configs.getServerConfig().session.secret);
}

export const decodeToken = (token: object, callback: Function) => {
  const payload = jwt.decode(token, configs.getServerConfig().session.secret);
  const now = moment().unix();
  // check if the token has expired
  if (now > payload.exp) {
    callback('Token has expired.');
  } else { callback(null, payload); }
}

export const encrypt = (passwdParam: string): string => {
  const salt = this.makeSalt();
  return bcrypt.hashSync(passwdParam, salt);
}
export const makeSalt = (): string => {
  return bcrypt.genSaltSync();
}
export const validatePassword = (passwdParam: string, dbPasswd: string): boolean => {
  const bool = bcrypt.compareSync(passwdParam, dbPasswd);
  if (!bool) {
    throw new Error('Password do not match !!! ');
  } else { return true; }
}

export const comparePassword = (passwdParam: string, dbPasswd: string, callback: any): void => {
  this.validatePassword(passwdParam, dbPasswd, (err: Error, isMatch: boolean) => {
    if (err) {
      return callback(err);
    } else {
      callback(null, isMatch);
    }
  });
}
