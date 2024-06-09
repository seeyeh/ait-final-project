import Express from 'express';
import { fileURLToPath } from 'url';
const router = Express.Router()
import usersController from '../controllers/usersController.js'

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch()
    .delete()

export default router;