import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalDirective} from '../directives/modal.directive';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ModalDirective],
  template: `
    <dialog [appModal]="!!(api.error$ | async)">
      <div (click)="api.dismissError()">
        <img src="/assets/images/voldemort.webp"/>
      </div>
    </dialog>
  `,
  styles: [
  ]
})
export class ModalComponent {
  public api = inject(ApiService);
}
