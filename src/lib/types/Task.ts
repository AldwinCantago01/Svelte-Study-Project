export type Subtask = {
    name: string,
    finished: boolean
}

export type Task = {
    id: number,
    name: string,
    subtasks: Subtask[]
}