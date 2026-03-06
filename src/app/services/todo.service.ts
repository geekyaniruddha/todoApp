import { Injectable } from '@angular/core';
import { TodoItemModel } from '../models/todo.model'
import { TodoStatus } from '../models/todo-status.enum';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'todoList';
  private todoList: TodoItemModel[] = [];
  private activeTab: 'all' | 'pending' | 'completed' = 'all';
  private searchTerm: string = '';
  constructor() {
    this.loadTasks();
  }

  // ===============================
  // 🔹 Public Getters
  // ===============================
  getAllTasks(): TodoItemModel[] {
    return this.todoList;
  }

  getVisibleTasks(): TodoItemModel[] {
    let list = [...this.todoList]; // clone (VERY IMPORTANT)

    // Tab filter
    if (this.activeTab === 'pending') {
      list = list.filter(t => t.status === TodoStatus.Pending);
    }

    if (this.activeTab === 'completed') {
      list = list.filter(t => t.status === TodoStatus.Completed);
    }

    if(this.searchTerm){
      const search = this.searchTerm.toLowerCase();
      list = list.filter(t => t.todoItem.toLocaleLowerCase().includes(search));
    }

    return list;
  }

  getTotalCount(): number{
    return this.todoList.length
  }

  getPendingCount(): number{
    return this.todoList.filter(x=>x.status === TodoStatus.Pending).length
  }

  getCompletedCount(): number{
    return this.todoList.filter(x=>x.status === TodoStatus.Completed).length
  }

  // ===============================
  // 🔹 UI State Setters
  // ===============================

  setTab(tab: 'all' | 'pending' | 'completed') {
    this.activeTab = tab;
  }

  setSearch(searchTerm: string){
    this.searchTerm = searchTerm
  }

  // ===============================
  // 🔹 CRUD
  // ===============================

  addTask(taskName: string): void {
    const newTodo = new TodoItemModel();
    newTodo.id = this.generateId();
    newTodo.todoItem = taskName;
    newTodo.createdDate = new Date();
    newTodo.status = TodoStatus.Pending;

    this.todoList.push(newTodo);
    this.saveTasks();
  }

  // ===============================
  // 🔹 Storage
  // ===============================

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
