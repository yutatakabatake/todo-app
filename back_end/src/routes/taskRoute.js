import express from 'express';
import { getTasks, createTask, deleteTask, editTask, doneTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', editTask);
router.put('/tasks/done/:id', doneTask);
router.delete('/tasks/:id', deleteTask);

export default router;