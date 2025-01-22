import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { TodoItem } from '../interfaces';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  editable = false;
  todoService: TodoService = inject(TodoService);

  @Input() item!: TodoItem;
  @Output() remove = new EventEmitter<TodoItem>();

  @ViewChild('editedItem')
  editedItemElement!: ElementRef;

  toogleEditable() {
    this.editable = !this.editable;
    if (this.editable) {
      this.editedItemElement.nativeElement.focus();
    } else {
      this.editedItemElement.nativeElement.blur();
    }
  }

  saveItem(item: TodoItem, title: string) {
    if (!title) return;
    this.editable = false;
    this.todoService.saveTodo(item, title);
  }

  toggleItemCompletion(item: TodoItem) {
    this.todoService.toggleTodoCompletion(item);
  }
}
