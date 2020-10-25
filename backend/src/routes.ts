import { errors } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import SessionController from './controllers/SessionController';
import UsersController from './controllers/UsersController';
import auth from './middlewares/auth';
import createUserValidation from './validations/createUserValidation';

const routes = Router();
const upload = multer(uploadConfig);

routes
  .route('/orphanages')
  .post(auth, upload.array('images'), OrphanagesController.create)
  .get(OrphanagesController.index);

routes.get('/orphanages/:id', OrphanagesController.show);

routes.post('/users', createUserValidation, UsersController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);

routes.post('/sessions', SessionController.create);

routes.use(errors());

export default routes;
