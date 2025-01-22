import { Injectable } from '@angular/core';
import { Filter, TodoItem } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoItems = JSON.parse(localStorage.getItem('ng-todos') as string) || [];

  constructor() {}

  getTodos(filter: Filter = 'all') {
    if (filter === 'all') {
      return this.todoItems;
    }
    return this.todoItems.filter((todo: TodoItem) =>
      filter === 'active' ? !todo.completed : todo.completed
    );
  }

  addTodo(title: string) {
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

  saveTodo(item: TodoItem, title: string) {
    if (!title) return;

    this.todoItems.forEach((todo: TodoItem) => {
      if (todo === item) todo.title = title;
    });

    this.saveToLocalStorage();
  }

  toggleTodoCompletion(item: TodoItem) {
    this.todoItems.forEach((todo: TodoItem) => {
      if (todo === item) todo.completed = !todo.completed;
    });

    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('ng-todos', JSON.stringify(this.todoItems));
  }
}
