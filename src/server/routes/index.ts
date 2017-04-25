import { Request, Response, Router, Express } from 'express';
import { InsertProduct, GetAllProducts } from './profile/product-router';
import { GetAllProfiles } from './profile/profile-router';
import { signUp, login } from './auth/auth-router';
import * as passport from 'passport';
// import { router as authLocalRouter } from './auth/local/index';
// import { router as passportLocal } from './auth/local/index';
const routes = Router();

export const globalRoute = (app: Express): void => {

  let requireAuth = passport.authenticate('jwt', { session: false }); //use for the other route
  let requireLogin = passport.authenticate('local', { session: false }); // use for route /api/auth/login only
  // Auth Routes
  app.use('/api/auth', routes.post('/signup', signUp));
  app.use('/api/auth', routes.post('/login', requireLogin, login));
  // for testing only
  app.use('/api/auth', routes.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send({ content: 'Success' });
  }));


  app.use('/api/products', routes.get('/', GetAllProducts));
  app.use('/api/products', routes.post('/', InsertProduct));

  app.use('/api/profiles', routes.get('/', GetAllProfiles));

  // Implement role authorization in the future only
  // app.use('/api/products',routes.get('/',requireAuth,roleAuthorization(['reader','creator','editor']), productRouter));
}
