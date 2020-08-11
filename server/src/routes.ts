import express from 'express';

import ClassController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const classController = new ClassController();
const connectionsController = new ConnectionsController();
const routes = express.Router();

routes.post('/classes', classController.create);

routes.get('/classes', classController.index);

routes.post('/connections', connectionsController.create);

routes.get('/connections', connectionsController.index);

export default routes;
