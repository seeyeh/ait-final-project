import Express from 'express';
const exercisesRouter = Express.Router();
import exercisesController from '../controllers/exercisesController.js';
import verifyJWT from '../middleware/verifyJWT.js';

exercisesRouter.use(verifyJWT); // applies middleware to all routes

exercisesRouter
  .route('/')
  .get(exercisesController.getExercise)
  .post(exercisesController.createNewExercise)
  .patch(exercisesController.updateExercise)
  .delete(exercisesController.deleteExercise);

export default exercisesRouter;
