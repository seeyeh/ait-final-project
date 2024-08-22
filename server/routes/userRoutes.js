import Express from 'express';
import usersController from '../controllers/usersController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const usersRouter = Express.Router();

usersRouter
  .route('/')
  .get(verifyJWT, usersController.getUser)
  .post(usersController.createNewUser)
  .patch(verifyJWT, usersController.updateUser)
  .delete(verifyJWT, usersController.deleteUser);

export default usersRouter;
