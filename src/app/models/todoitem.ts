export class TodoItemModel {
  id: number;
  todoItem: string;
  createdDate: Date;
  status: string;

  constructor() {
    this.id = 0;
    this.todoItem = "";
    this.createdDate = new Date();
    this.status = "Pending";
  }
}