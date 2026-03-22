import express from 'express';
import { getProjects, createProject, editProject } from '../controllers/projectController.js';

const projectRouter = express.Router();

projectRouter.get('/projects', getProjects);
projectRouter.post('/projects', createProject);
projectRouter.put('/projects/:id', editProject);

export default projectRouter;