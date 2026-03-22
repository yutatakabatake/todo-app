import express from 'express';
import { getProjects } from '../controllers/projectController.js';

const projectRouter = express.Router();

projectRouter.get('/projects', getProjects);

export default projectRouter;