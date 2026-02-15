import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItemModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoStatus } from '../../models/todo-status.enum';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo implements OnInit {
  todoList: TodoItemModel[] = [];
  newTask: string = "";
  todoStatus = TodoStatus;
  activeTab: 'all' | 'pending' | 'completed' = 'all';
  totalTaskCount: number = 0;
  pendingTaskCount: number = 0;
  completedTaskCount: number = 0;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh(): void {
    this.todoList = this.todoService.getVisibleTasks();
    this.totalTaskCount = this.todoService.getTotalCount();
    this.pendingTaskCount = this.todoService.getPendingCount();
    this.completedTaskCount = this.todoService.getCompletedCount();
  }
  getEmptyMessage(): string {
    switch (this.activeTab) {
      case 'pending':
        return 'No pending tasks found.';

      case 'completed':
        return 'No completed tasks found.';

      default:
        return 'No tasks found.';
    }
  }
  setTab(tab: 'all' | 'pending' | 'completed'): void {
    this.activeTab = tab;
    this.todoService.setTab(tab);
    this.refresh();
  }
  onSaveTask(): void {
    if (!this.newTask.trim()) return;

    this.todoService.addTask(this.newTask);
    this.todoList = this.todoService.getAllTasks();
    this.newTask = "";
  }
}