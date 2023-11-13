import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appModal]',
  standalone: true
})
export class ModalDirective implements OnInit, OnChanges {
  @Input() appModal!: boolean
  constructor(private el: ElementRef<HTMLDialogElement>) { }

  ngOnInit(): void {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  private update() {
    if(!!this.el) {
      if(this.appModal) {
        this.el.nativeElement.showModal();
      } else {
        this.el.nativeElement.close();
      }
    }
  }

}
