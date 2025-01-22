import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TodoItem } from '../interfaces';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  editable = false;

  @Input() item!: TodoItem;
  @Output() remove = new EventEmitter<TodoItem>();
  @Output() save = new EventEmitter<TodoItem>();

  @ViewChild('editedItem')
  editedItemElement!: ElementRef;

  saveItem(title: string) {
    if (!title) return;

    this.editable = false;
    this.item.title = title;

    this.save.emit();
  }

  toogleEditable() {
    this.editable = !this.editable;
    if (this.editable) {
      this.editedItemElement.nativeElement.focus();
    } else {
      this.editedItemElement.nativeElement.blur();
    }
  }

  toggleItemCompletion(item: TodoItem) {
    item.completed = !item.completed;

    this.save.emit();
  }
}
