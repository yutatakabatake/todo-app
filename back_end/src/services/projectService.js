import query from "../db.js";

export async function getAllProjects() {
    const { rows } = await query(`
        SELECT 
            id, 
            label
        FROM projects_tb
        ORDER BY id ASC`);
    return rows;
}

export async function createProject(projectData) {
    const { label } = projectData;
    const { rows } = await query(`
        INSERT INTO projects_tb (
            label)
        VALUES ($1)
        RETURNING id, label`,
        [label]);

    return rows[0];
}