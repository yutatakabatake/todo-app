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