import * as projectService from "../services/projectService.js";

export async function getProjects(req, res) {
    try {
        const tasks = await projectService.getAllProjects();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}