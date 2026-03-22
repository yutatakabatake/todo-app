import type dayjs from "dayjs"

export type TimeSlot = 'Morning' | 'Evening' | 'Night' | 'Nothing'
export type Filter = 'today' | 'expired'
export type TaskType = {
    id: number
    title: string
    project_id: number | null
    done: boolean
    task_date: string
    done_date: string | null
    expected_time: number
    start_time: dayjs.Dayjs | null
    actual_time: number | null
    time_slot: TimeSlot
    is_working: boolean
}

export type ProjectType = {
    id: number
    label: string
}