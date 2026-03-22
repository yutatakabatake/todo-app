import * as taskService from "../services/taskService.js";

export async function getTasks(req, res) {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function createTask(req, res) {
    try {
        const taskData = req.body;
        if (!taskData) {
            return res.status(400).json({ message: "No data provided" });
        }
        const newTask = await taskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function editTask(req, res) {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const updatedTask = await taskService.editTask(taskId, taskData);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error editing task', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function doneTask(req, res) {
    try {
        const taskId = req.params.id;
        const updatedTask = await taskService.doneTask(taskId);
        if (!updatedTask) {
            res.status(400).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating done task', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function startTask(req, res) {
    try {
        const taskId = req.params.id;
        const updatedTask = await taskService.startTask(taskId);
        if (!updatedTask) {
            res.status(400).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating done task', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function stopTask(req, res) {
    try {
        const taskId = req.params.id;
        const updatedTask = await taskService.stopTask(taskId);
        if (!updatedTask) {
            res.status(400).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating done task', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deleteTask(req, res) {
    try {
        const task_id = req.params.id;
        const deleted = await taskService.deleteTask(task_id);
        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

