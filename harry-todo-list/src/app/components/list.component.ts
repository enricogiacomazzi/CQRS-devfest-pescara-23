import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from '../api.service';
import {ListItemComponent} from './list-item.component';
import {ItemModel} from '../models';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  template: `
    <div class="list">
      <app-list-item *ngFor="let item of api.items$ | async; trackBy: track"
                     [item]="item" (deleteItem)="api.deleteItem(item)">
      </app-list-item>
    </div>
  `,
  styles: []
})
export class ListComponent {
  public api = inject(ApiService);
  public track(index: number, item: ItemModel) {
    return item.id;
  }
}
