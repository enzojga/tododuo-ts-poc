export type TaskEntity = {
    id?: Number,
    name: String,
    description: String,
    user_id: Number,
}

export type Taks = Omit<TaskEntity, "id" | "user_id">