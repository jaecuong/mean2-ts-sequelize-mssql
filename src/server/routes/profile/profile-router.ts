import { ProfileRepository } from '../../services/index';
import { ProfileInstance } from '../../models/interfaces/profile-interface';
import { Request, Response, Router } from 'express';
// import { encodeToken } from '../utils/jwtHelper';
// import { configs } from '../../../configs/index';

// export const router = Router();

// router.post('/authen', (req: Request, res: Response) => {
//   // authentication service
//   // ProfileRepository.authenticateProfile(req.params.Email, req.params.Passwd).then((profile: ProfileInstance) => {
//   //   if (profile) {
//   //     // authentication successful
//   //     return res.send(profile);
//   //   } else {
//   //     // authentication failed
//   //     return res.sendStatus(401).send('Authentication Failed !!!');
//   //   }
//   // }).catch((error: Error) => {
//   //   return res.status(500).send('Authentication Failed With Error = ' + error);
//   // });
// });

// router.post('/signup', (req: Request, res: Response) => {
//   // let deferred = Q.defer();
//   ProfileRepository.retrieveProfile(req.params.Email).then((profile: ProfileInstance) => {
//     if (profile) {
//       // username already exists
//       return res.status(200).send('username already exists !!! ');
//     } else {
//       ProfileRepository.createProfile(req.body).then((profile: ProfileInstance) => {
//         return res.status(201).send(profile);
//       }).catch((error: Error) => {
//         return res.status(409).send(error);
//       });
//     }
//   }).catch((error: Error) => {
//     return res.status(400).send(error);
//   });
// });

// router.post('/current', (req: Request, res: Response) => {
//   ProfileRepository.retrieveProfile(req.params.Email).then((profile: ProfileInstance) => {
//     if (profile) {
//       return res.send(profile);
//     } else {
//       res.sendStatus(404);
//     }
//   }).catch((error: Error) => {
//     return res.status(400).send(error);
//   });
// });

// router.post('/', (req: Request, res: Response) => {
//   ProfileRepository.createProfile(req.body).then((profile: ProfileInstance) => {
//     return res.status(201).send(profile);
//   }).catch((error: Error) => {
//     return res.status(409).send(error);
//   });
// });

// router.get('/:name', (req: Request, res: Response) => {
//   ProfileRepository.retrieveProfile(req.params.name).then((profile: ProfileInstance) => {
//     if (profile) {
//       return res.send(profile);
//     } else {
//       return res.sendStatus(404);
//     }
//   }).catch((error: Error) => {
//     return res.status(500).send(error);
//   });
// });

export const GetAllProfiles = (req: Request, res: Response) => {
  ProfileRepository.retrieveProfiles().then((profilesResult: Array<ProfileInstance>) => {
    return res.send(profilesResult);
  }).catch((error: Error) => {
    return res.status(500).send(error);
  });
}

// router.post('/:name', (req: Request, res: Response) => {
//   ProfileRepository.updateProfile(req.params.name, req.body).then(() => {
//     return res.sendStatus(200);
//   }).catch((error: Error) => {
//     return res.status(409).send(error);
//   });
// });

// router.delete('/:name', (req: Request, res: Response) => {
//   ProfileRepository.deleteProfile(req.params.name).then(() => {
//     return res.sendStatus(200);
//   }).catch((error: Error) => {
//     return res.status(500).send(error);
//   });
// });
