import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[err-msg]',
})
export class ErrInputMessageDirective implements OnInit {
  #htmlElement: ElementRef<HTMLElement>;
  #class = 'text-danger';

  constructor(private el: ElementRef<HTMLElement>) {
    this.#htmlElement = el;
  }

  ngOnInit(): void {
    this.#setColor();
  }

  #setColor() {
    this.#htmlElement.nativeElement.classList.add(this.#class);
  }
}
