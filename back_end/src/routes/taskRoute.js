import express from 'express';
import { getTasks, createTask, deleteTask, editTask, doneTask, startTask, stopTask } from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.get('/tasks', getTasks);
taskRouter.post('/tasks', createTask);
taskRouter.put('/tasks/:id', editTask);
taskRouter.put('/tasks/done/:id', doneTask);
taskRouter.put('/tasks/start/:id', startTask);
taskRouter.put('/tasks/stop/:id', stopTask);
taskRouter.delete('/tasks/:id', deleteTask);

export default taskRouter;