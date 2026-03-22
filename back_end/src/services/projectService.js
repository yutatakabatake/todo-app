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