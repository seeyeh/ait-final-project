import Express from 'express';
import usersController from '../controllers/usersController.js';

const usersRouter = Express.Router();

usersRouter
  .route('/')
  .get(usersController.getUser)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default usersRouter;
