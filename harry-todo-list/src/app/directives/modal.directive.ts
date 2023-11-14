import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appModal]',
  standalone: true
})
export class ModalDirective {
  @Input() set appModal(value: boolean) {
    if(value) {
      this.el.nativeElement.showModal();
    } else {
      this.el.nativeElement.close();
    }
  }
  constructor(private el: ElementRef<HTMLDialogElement>) {}

}
