
import { ProfileRepository } from '../../services/index';
import { ProfileInstance, ProfileAttributes } from '../../models/interfaces/profile-interface';
import { Request, Response, Router } from 'express';
import { configs } from '../../../configs/index';
import { logger } from '../../utils/index';
import { models } from '../../models/index';
import jwt from 'jsonwebtoken';


function generateToken(user) {
  return jwt.sign(user, configs.getServerConfig().session.secret, {
    expiresIn: 10080
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email
    // role: request.role //implement in the future
  };
}

// /api/auth/login
export const signUp = (req: Request, res: Response, next: Function) => {
  // var email = req.body.email;
  // var password = req.body.password;
  // var role = req.body.role;

  if (!req.body.email) {
    return res.status(422).send({ error: 'You must enter an email address' });
  }

  if (!req.body.password) {
    return res.status(422).send({ error: 'You must enter a password' });
  }

  ProfileRepository.retrieveProfile(req.body.email).then((existingUser: ProfileInstance) => {
    if (existingUser) {
      return res.status(422).send({ error: 'Email address is already in use' });
    }
    ProfileRepository.createProfile(req.body).then((profile: ProfileInstance) => {
      var profileInfo = setUserInfo(profile);

      res.status(201).json({
        token: 'JWT ' + generateToken(profileInfo),
        user: profileInfo
      })

      return res.status(201).send(profile);
    }, (err: Error) => {
      logger.error(`Create profile ${req.body.email} error = ${err.message}`);
      return next(err);
    });

  }, (err: Error) => {
    logger.error(`Signup ${req.body.email} error = ${err.message}`);
    return next(err);
  });


}

// /api/auth/login
export const login = (req: Request, res: Response, next: Function) => {
  const profileInfo = setUserInfo(req.profile);

  res.status(200).json({
    token: 'JWT ' + generateToken(profileInfo),
    user: profileInfo
  });
}

// use in the future
// export const roleAuthorization = (roles:any) => {

//   return function (req, res, next) {

//     var user = req.user;

//     User.findById(user._id, function (err, foundUser) {
//       if (err) {
//         res.status(422).json({ error: 'No user found.' });
//         return next(err);
//       }
//       if (roles.indexOf(foundUser.role) > -1) {
//         return next();
//       }
//       res.status(401).json({ error: 'You are not authorized to view this content' });
//       return next('Unauthorized');
//     });
//   }
// }
