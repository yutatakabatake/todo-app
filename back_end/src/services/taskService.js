import query from "../db.js";

export async function getAllTasks() {
    const { rows } = await query('SELECT id , title , project_id , done , task_date , expected_time , start_time , actual_time , time_slot , is_working FROM tasks_tb');
    return rows;
}