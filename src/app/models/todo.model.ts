import { TodoStatus } from '../models/todo-status.enum'
export class TodoItemModel {
  id: number;
  todoItem: string;
  createdDate: Date;
  status: TodoStatus;

  constructor() {
    this.id = 0;
    this.todoItem = "";
    this.createdDate = new Date();
    this.status = TodoStatus.Pending;
  }
}