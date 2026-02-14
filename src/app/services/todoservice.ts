import { Injectable } from '@angular/core';
import { TodoItemModel } from '../models/todoitem'
@Injectable({
  providedIn: 'root',
})
export class Todoservice {
  private storageKey = 'todoList';
  private todoList: TodoItemModel[] = [];

  constructor() {
    this.loadTasks();
  }

  getAllTasks(): TodoItemModel[] {
    return this.todoList;
  }

   addTask(taskName: string): void {
    const newTodo = new TodoItemModel();
    newTodo.id = this.generateId();
    newTodo.todoItem = taskName;
    newTodo.createdDate = new Date();
    newTodo.status = "Pending";

    this.todoList.push(newTodo);
    this.saveTasks();
  }

  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todoList));
  }

  private loadTasks(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const parsed = JSON.parse(data);

      this.todoList = parsed.map((item: any) => {
        const todo = new TodoItemModel();
        todo.id = item.id;
        todo.todoItem = item.todoItem;
        todo.createdDate = new Date(item.createdDate);
        todo.status = item.status;
        return todo;
      });
    }
  }

  private generateId(): number {
    return this.todoList.length > 0
      ? Math.max(...this.todoList.map(x => x.id)) + 1
      : 1;
  }
}
