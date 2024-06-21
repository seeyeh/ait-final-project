import Express from 'express';
import { fileURLToPath } from 'url';
const workoutsRouter = Express.Router();
import workoutsController from '../controllers/workoutsController.js';

workoutsRouter
  .route('/')
  .get(workoutsController.getWorkout)
  .post(workoutsController.createNewWorkout)
  .patch(workoutsController.updateWorkout)
  .delete(workoutsController.deleteWorkout);

export default workoutsRouter;
