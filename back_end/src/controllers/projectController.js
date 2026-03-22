import * as projectService from "../services/projectService.js";

export async function getProjects(req, res) {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function createProject(req, res) {
    try {
        const projectData = req.body;
        if (!projectData) {
            return res.status(400).json({ message: "No data provided" });
        }
        const newProject = await projectService.createProject(projectData);
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}