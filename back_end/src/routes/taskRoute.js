import express from 'express';
import { getTasks, createTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);

export default router;