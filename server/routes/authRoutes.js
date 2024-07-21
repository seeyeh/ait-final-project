import Express from 'express';
const router = express.Router();
import authController from '../controllers/authController';

router.route('/').post();

router.route('/refresh').get();

router.route('/logout').post();

export default router;
