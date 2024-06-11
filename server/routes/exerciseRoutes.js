import Express from 'express';
import { fileURLToPath } from 'url';
const exercisesRouter = Express.Router()
import exercisesController from '../controllers/exercisesController.js'

exercisesRouter.route('/')
    .get(exercisesController.getExercise)
    .post(exercisesController.createNewExercise)
    .patch(exercisesController.updateExercise)
    .delete(exercisesController.deleteExercise)

export default exercisesRouter;