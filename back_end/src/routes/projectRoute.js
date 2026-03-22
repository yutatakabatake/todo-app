import express from 'express';
import { getProjects, createProject } from '../controllers/projectController.js';

const projectRouter = express.Router();

projectRouter.get('/projects', getProjects);
projectRouter.post('/projects', createProject);

export default projectRouter;