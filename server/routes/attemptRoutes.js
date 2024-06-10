import Express from 'express';
import { fileURLToPath } from 'url';
const attemptsRouter = Express.Router()
import attemptsController from '../controllers/attemptsController.js'

attemptsRouter.route('/')
    .get(attemptsController.getAllAttempts)
    .post(attemptsController.createNewAttempt)
    .patch(attemptsController.updateAttempt)
    .delete(attemptsController.deleteAttempt)

export default attemptsRouter;