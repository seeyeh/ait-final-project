import Express from 'express';
import exercisesController from '../controllers/exercisesController.js';

const exercisesRouter = Express.Router();

exercisesRouter
  .route('/')
  .get(exercisesController.getExercise)
  .post(exercisesController.createNewExercise)
  .patch(exercisesController.updateExercise)
  .delete(exercisesController.deleteExercise);

export default exercisesRouter;
