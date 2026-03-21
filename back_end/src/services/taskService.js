import query from "../db.js";

export async function getAllTasks() {
    const { rows } = await query(`
        SELECT 
            id, 
            title, 
            project_id AS "projectId", 
            done, 
            TO_CHAR(task_date, 'YYYY/MM/DD') AS "date",
            expected_time AS "expectedTime", 
            start_time AS "startTime", 
            actual_time AS "actualTime", 
            time_slot AS "timeSlot", 
            is_working AS "isWorking"
        FROM tasks_tb 
        ORDER BY task_date ASC`);
    return rows;
}

export async function createTask(taskData) {
    const { title, project_id, expected_time, time_slot } = taskData;
    const { rows } = await query(`
        INSERT INTO tasks_tb (
            title, 
            project_id, 
            done, 
            task_date, 
            expected_time, 
            start_time, 
            actual_time, 
            time_slot, 
            is_working)
        VALUES ($1, $2, false, CURRENT_DATE, $3, NULL, NULL, $4, false)
        RETURNING *`,
        [title, project_id, expected_time, time_slot]);

    return rows[0];
}