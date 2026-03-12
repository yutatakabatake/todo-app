import type dayjs from "dayjs"

export type TimeSlot = 'Morning' | 'Evening' | 'Night' | 'Nothing'
export type Filter = 'today' | 'expired'
export type TaskType = {
    id: number
    title: string
    projectId: number | null
    done: boolean
    date: string
    expectedTime: number
    startTime: dayjs.Dayjs | null
    actualTime: number | null
    timeSlot: TimeSlot
    isWorking: boolean
}

export type ProjectType = {
    id: number
    label: string
}