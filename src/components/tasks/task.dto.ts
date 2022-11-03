export interface CreateTaskDTO {
  title: string
  description: string
  isCompleted: boolean
}

export interface UpdateTaskDTO extends CreateTaskDTO {}
