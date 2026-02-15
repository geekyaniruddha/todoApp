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

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoList = this.todoService.getAllTasks();
  }

  onSaveTask(): void {
    if (!this.newTask.trim()) return;

    this.todoService.addTask(this.newTask);
    this.todoList = this.todoService.getAllTasks();
    this.newTask = "";
  }
}