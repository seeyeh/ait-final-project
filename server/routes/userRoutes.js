import Express from 'express';
import { fileURLToPath } from 'url';
const usersRouter = Express.Router()
import usersController from '../controllers/usersController.js'

usersRouter.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

export default usersRouter;