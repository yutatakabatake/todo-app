import * as clientService from "../services/taskService.js";

export async function getTasks(req, res) {
    try {
        const tasks = await clientService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}