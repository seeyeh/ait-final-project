import Express from 'express';
import workoutsController from '../controllers/workoutsController.js';

const workoutsRouter = Express.Router();

workoutsRouter
  .route('/')
  .get(workoutsController.getWorkout)
  .post(workoutsController.createNewWorkout)
  .patch(workoutsController.updateWorkout)
  .delete(workoutsController.deleteWorkout);

export default workoutsRouter;
