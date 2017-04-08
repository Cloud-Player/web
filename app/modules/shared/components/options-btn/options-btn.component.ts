import {Component, ElementRef, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';

@Component({
  selector: 'options-btn',
  styles: [require('./options-btn.style.scss')],
  template: require('./options-btn.template.html')
})
export class OptionsBtnComponent implements OnInit {
  public options: Array<OptionsBtnOptionComponent> = [];
  public optionsAreVisible: Boolean = false;
  @Output() openState = new EventEmitter();
  @ViewChild('optionsHolder') optionsHolder: ElementRef;
  @ViewChild('toggler') toggler: ElementRef;

  constructor(private el: ElementRef) {

  }

  private getScrollOffset(): number {
    let scrollViewContainer = document.querySelector('scroll-view');
    if (scrollViewContainer) {
      return scrollViewContainer.scrollTop;
    } else {
      return document.scrollingElement.scrollTop;
    }
  }

  private registerCloseListeners() {
    let close = (ev: MouseEvent) => {
      if(!this.toggler.nativeElement.contains(ev.target)){
        this.close();
      }
      document.removeEventListener('scroll', close, true);
      document.removeEventListener('click', close, true);
    };
    document.addEventListener('scroll', close, true);
    document.addEventListener('click', close, true);
  }

  public addOption(option: OptionsBtnOptionComponent) {
    this.options.push(option);
  }

  public open(): void {
    this.registerCloseListeners();
    this.optionsHolder.nativeElement.style.left = `${this.el.nativeElement.offsetLeft}px`;
    this.optionsHolder.nativeElement.style.top = `${this.el.nativeElement.getBoundingClientRect().top}px`;
    this.optionsAreVisible = true;
    this.openState.emit(true);
  }

  public close(): void {
    this.optionsAreVisible = false;
    this.openState.emit(false);
  }

  public toggleOpen(): void {
    if (this.optionsAreVisible) {
      this.close();
    } else {
      this.open();
    }
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'options-btn-option',
  template: '<li class="option-btn-option"><ng-content></ng-content></li>'
})
export class OptionsBtnOptionComponent {
  constructor(public el: ElementRef, optionsHolder: OptionsBtnComponent) {
    optionsHolder.addOption(this);
  }
}
