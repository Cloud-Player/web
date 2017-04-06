import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[fillHeight]'
})
export class FillHeightDirective implements OnInit {

  constructor(private el: ElementRef) {
  }


  ngOnInit(): void {
    let offsetTop = this.el.nativeElement.offsetTop;
    this.el.nativeElement.style.height = `calc(100vh - ${offsetTop}px)`;
    this.el.nativeElement.classList.add('scrollable');
  }

}
