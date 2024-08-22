import Express from 'express';
import splitsController from '../controllers/splitsController.js';

const splitsRouter = Express.Router();

splitsRouter
  .route('/')
  .get(splitsController.getSplit)
  .post(splitsController.createNewSplit)
  .patch(splitsController.updateSplit)
  .delete(splitsController.deleteSplit);

export default splitsRouter;
