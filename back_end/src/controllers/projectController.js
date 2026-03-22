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

export async function editProject(req, res) {
    try {
        const projectId = req.params.id;
        const projectData = req.body;
        const updatedProject = await projectService.editProject(projectId, projectData);
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error editting project', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function deleteProject(req, res) {
    try {
        const project_id = req.params.id;
        const deleted = await projectService.deleteProject(project_id);
        if (!deleted) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}