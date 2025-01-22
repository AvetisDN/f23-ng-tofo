import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import todos from './data';
import { ItemComponent } from './item/item.component';
import { TodoItem } from './interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'NgTodo';
  filter: 'all' | 'active' | 'done' = 'all';
  todoItems = JSON.parse(localStorage.getItem('ng-todos') as string) || [];

  get todos() {
    if (this.filter === 'all') {
      return this.todoItems;
    }
    return this.todoItems.filter((todo: TodoItem) =>
      this.filter === 'active' ? !todo.completed : todo.completed
    );
  }

  addTodo(event: Event, title: string) {
    event.preventDefault();
    if (!title) return;

    this.todoItems.unshift({
      title,
      completed: false,
    });

    this.saveToLocalStorage();
  }

  removeTodo(todo: TodoItem) {
    this.todoItems.splice(this.todoItems.indexOf(todo), 1);

    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('ng-todos', JSON.stringify(this.todoItems));
  }
}
