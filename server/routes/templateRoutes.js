import Express from 'express';
const templatesRouter = Express.Router();
import templatesController from '../controllers/templatesController.js';

templatesRouter
  .route('/')
  .get(templatesController.getTemplate)
  .post(templatesController.createNewTemplate)
  .patch(templatesController.updateTemplate)
  .delete(templatesController.deleteTemplate);

export default templatesRouter;
