import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemModel} from '../models';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="item" (click)="deleteItem.emit()">
      <div class="img">
        <img [src]="imgPath"/>
      </div>
      <span>{{item.text}}</span>
    </div>

  `,
  styles: [
  ]
})
export class ListItemComponent {
  @Input() item!: ItemModel;
  @Output() deleteItem = new EventEmitter();

  public get imgPath() {
    return `/assets/images/${this.item.imgUrl}`;
  }
}
