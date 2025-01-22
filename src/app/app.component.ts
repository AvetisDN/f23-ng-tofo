import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { Filter, TodoItem } from './interfaces';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'NgTodo';
  filter: Filter = 'all';
  todoItems: TodoItem[] = [];
  todoService: TodoService = inject(TodoService);

  constructor() {
    this.todoItems = this.todoService.getTodos();
  }

  addItem(event: Event, title: string) {
    event.preventDefault();
    this.todoService.addTodo(title);
  }

  removeItem(todo: TodoItem) {
    this.todoService.removeTodo(todo);
  }

  setFilterValue(filter: Filter) {
    this.filter = filter;
    this.todoItems = this.todoService.getTodos(filter);
  }
}
