import {Directive, ElementRef, Renderer, OnInit} from '@angular/core';

@Directive({
  selector: '[focusInput]'
})
export class FocusInputDirective implements OnInit{

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }

}
