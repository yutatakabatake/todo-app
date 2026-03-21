import query from "../db.js";

export async function getAllTasks() {
    const { rows } = await query(`
        SELECT 
            id, 
            title, 
            project_id, 
            done, 
            TO_CHAR(task_date, 'YYYY/MM/DD') AS "task_date",
            expected_time, 
            start_time, 
            actual_time, 
            time_slot, 
            is_working
        FROM tasks_tb 
        ORDER BY id ASC`);
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
        RETURNING 
            id, 
            title, 
            project_id, 
            done, 
            TO_CHAR(task_date, 'YYYY/MM/DD') AS "task_date",
            expected_time, 
            start_time, 
            actual_time, 
            time_slot, 
            is_working`,
        [title, project_id, expected_time, time_slot]);

    return rows[0];
}

export async function editTask(taskId, taskData) {
    const { title, project_id, expected_time, time_slot } = taskData;
    const { rows } = await query(`
        UPDATE tasks_tb
        SET title = $2,
            project_id = $3,
            task_date = CURRENT_DATE,
            expected_time = $4,
            time_slot = $5
        WHERE id = $1
        RETURNING
            id,
            title,
            project_id,
            done,
            TO_CHAR(task_date, 'YYYY/MM/DD') AS "task_date",
            expected_time,
            start_time,
            actual_time,
            time_slot,
            is_working`,
        [taskId, title, project_id, expected_time, time_slot]
    );

    return rows[0];
}

export async function doneTask(taskId) {
    const { rows } = await query(`
        UPDATE tasks_tb
        SET done = NOT done,
            actual_time = COALESCE(actual_time, 0)
        WHERE id = $1
        RETURNING
            id, 
            title, 
            project_id, 
            done, 
            TO_CHAR(task_date, 'YYYY/MM/DD') AS "task_date",
            expected_time, 
            start_time, 
            actual_time, 
            time_slot, 
            is_working`,
        [taskId]
    );

    return rows[0];
}

export async function deleteTask(task_id) {
    const { rowCount } = await query('DELETE FROM tasks_tb WHERE id = $1', [task_id]);
    return rowCount > 0;
}