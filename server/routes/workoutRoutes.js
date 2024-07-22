import Express from 'express';
const workoutsRouter = Express.Router();
import workoutsController from '../controllers/workoutsController.js';
import verifyJWT from '../middleware/verifyJWT.js';

workoutsRouter.use(verifyJWT); // applies middleware to all routes

workoutsRouter
  .route('/')
  .get(workoutsController.getWorkout)
  .post(workoutsController.createNewWorkout)
  .patch(workoutsController.updateWorkout)
  .delete(workoutsController.deleteWorkout);

export default workoutsRouter;
