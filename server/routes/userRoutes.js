import Express from 'express';
const usersRouter = Express.Router();
import usersController from '../controllers/usersController.js';
import verifyJWT from '../middleware/verifyJWT.js';

usersRouter.use(verifyJWT); // applies middleware to all routes

usersRouter
  .route('/')
  .get(usersController.getUser)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default usersRouter;
