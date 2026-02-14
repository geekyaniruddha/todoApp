import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItemModel } from '../../models/todo.model';
import { Todoservice } from '../../services/todoservice';

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo implements OnInit {
  todoList: TodoItemModel[] = [];
  newTask: string = "";

  constructor(private todoService: Todoservice) { }

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