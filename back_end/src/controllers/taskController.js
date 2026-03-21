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