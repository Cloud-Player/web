import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appFocusInput]'
})
export class FocusInputDirective implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }

}
