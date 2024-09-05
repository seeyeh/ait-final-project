import Express from 'express';
import templatesController from '../controllers/templatesController.js';

const templatesRouter = Express.Router();

templatesRouter
  .route('/')
  .get(templatesController.getTemplate)
  .post(templatesController.createNewTemplate)
  .patch(templatesController.updateTemplate)
  .delete(templatesController.deleteTemplate);

export default templatesRouter;
