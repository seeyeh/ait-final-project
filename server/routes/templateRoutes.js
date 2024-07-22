import Express from 'express';
const templatesRouter = Express.Router();
import templatesController from '../controllers/templatesController.js';
import verifyJWT from '../middleware/verifyJWT.js';

templatesRouter.use(verifyJWT); // applies middleware to all routes

templatesRouter
  .route('/')
  .get(templatesController.getTemplate)
  .post(templatesController.createNewTemplate)
  .patch(templatesController.updateTemplate)
  .delete(templatesController.deleteTemplate);

export default templatesRouter;
