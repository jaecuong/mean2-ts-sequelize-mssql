import passport from 'passport';
import { ProfileRepository } from '../../../services/index';
import { logger } from '../../../utils/index';
import { Encrypt, ComparePassword } from '../../../utils/index';
import { ProfileInstance } from "../../../models/interfaces/profile-interface";
import { configs } from '../../../../configs/index';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (email: string, password: string, done: Function) => {
  logger.info(`LOCAL LOGIN STARTING`);
  logger.info(`${email} is trying to login`);

  ProfileRepository.retrieveProfile(email.toLowerCase())
    .then((profile: ProfileInstance) => {
      if (!profile) {
        logger.warn(`Passport LocalStrategy Authenticate -----> ${email} was not registered`);
        return done(null, false, {
          error: 'Login failed. Please try again.'
        });
      }

      ComparePassword(password, profile.dataValues.Passwd, (err, isMatch) => {
        if (err) {
          logger.error(`Passport LocalStrategy Authenticate Error = -----> ${err} `);
          return done(err);
        }
        if (!isMatch) {
          logger.warn(`Passport LocalStrategy Authenticate -----> ${email} Login failed. Please try again. `);
          return done(null, false, { error: 'Login failed. Please try again.' });
        }
        return done(null, profile);
      });

      return done(null, profile);
    }, (err: Error) => {
      logger.error(`LOCAL LOGING ERROR = ${err}`);
      return done(err);
    });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: configs.getServerConfig().session.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload: any, done: Function) => {
  logger.info(`JWT LOGIN STARTING`);
  ProfileRepository.getProfileById(payload._id).then((profile: ProfileInstance) => {
    if (profile) { done(null, profile); }
    else { done(null, false); }
  }, (err: Error) => {
    logger.error(`JWT LOGIN ERROR = ${err}`);
    return done(err, false);
  })
});

export const setupJwtPassport = (): void => {
  passport.use(jwtLogin);
  passport.use(localLogin);
}

