import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from './api.service';
import {ListComponent} from './components/list.component';
import {ModalComponent} from './components/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListComponent, ModalComponent],
  template: `
    <div class="container">
      <h1>Harry's todo-list</h1>
      <ng-container *ngIf="api.init$ | async">
        <app-list></app-list>
        <app-modal></app-modal>
      </ng-container>
    </div>
  `,
  styles: [
  ],
})
export class AppComponent {
  public api = inject(ApiService);
}
