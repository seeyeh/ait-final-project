import Express from 'express';
const splitsRouter = Express.Router();
import splitsController from '../controllers/splitsController.js';
import verifyJWT from '../middleware/verifyJWT.js';

splitsRouter.use(verifyJWT); // applies middleware to all routes

splitsRouter
  .route('/')
  .get(splitsController.getSplit)
  .post(splitsController.createNewSplit)
  .patch(splitsController.updateSplit)
  .delete(splitsController.deleteSplit);

export default splitsRouter;
