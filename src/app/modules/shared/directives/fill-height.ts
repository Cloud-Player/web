import {AfterContentInit, Directive, ElementRef, Input, OnDestroy, Optional} from '@angular/core';
import {LayoutChangeTypes, LayoutService, WindowBreakPointTypes, WindowElementTypes} from '../services/layout';
import {Subscription} from 'rxjs';
import {ModalService} from '../services/modal';
import {ModalComponent} from '../components/modal/modal/modal';
import {filter} from 'rxjs/internal/operators';

@Directive({
  selector: '[appFillHeight]'
})
export class FillHeightDirective implements AfterContentInit, OnDestroy {
  private static playerHeight = 45;
  private static menuHeight = 40;
  private _padding = 0;
  private _subscription: Subscription;

  private _boundingClientRec: ClientRect;

  @Input()
  minHeight = true;

  constructor(private el: ElementRef,
              private layoutService: LayoutService,
              private modalService: ModalService,
              @Optional() private modal: ModalComponent) {
    this._subscription = new Subscription();
  }

  private setHeight() {
    const offsetTop = this._boundingClientRec.top;
    let screenHeight = '100vh';
    let offsetBottom = 0;
    if (this.layoutService.isOneOfTheBreakPointsActive([WindowBreakPointTypes.sm, WindowBreakPointTypes.xs])) {
      offsetBottom += FillHeightDirective.menuHeight;
    }
    if (this.layoutService.isBreakPointActive(WindowBreakPointTypes.xs) &&
      this.layoutService.hasWindowElement(WindowElementTypes.MusicPlayer)) {
      offsetBottom += FillHeightDirective.playerHeight;
    }
    if (this.modal) {
      screenHeight = '80vh';
      offsetBottom = 0;
    }

    const height = `calc(${screenHeight} - ${offsetTop + offsetBottom - this._padding}px)`;
    if (this.minHeight) {
      this.el.nativeElement.style.minHeight = height;
    } else {
      this.el.nativeElement.style.height = height;
    }
  }

  ngAfterContentInit(): void {
    this._padding += parseInt(this.el.nativeElement.style.paddingTop, 10) || 0;
    this._padding += parseInt(this.el.nativeElement.style.paddingBottom, 10) || 0;
    this._boundingClientRec = this.el.nativeElement.getBoundingClientRect();
    this.setHeight();
    this._subscription.add(
      this.layoutService.getObservable()
        .pipe(
          filter((ev) => {
            return ev.changeType === LayoutChangeTypes.windowBreakpointChange;
          })
        )
        .subscribe(this.setHeight.bind(this))
    );
    this._subscription.add(
      this.layoutService.getObservable()
        .pipe(
          filter((ev) => {
            return ev.changeType === LayoutChangeTypes.windowElementChange;
          })
        )
        .subscribe((ev) => {
          this.setHeight();
        })
    );
    if (this.modal) {
      this._subscription.add(
        this.modal.visibilityChange.subscribe(() => {
          setTimeout(() => {
            this._boundingClientRec = this.el.nativeElement.getBoundingClientRect();
          });
        })
      );
    }
    this.setHeight();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
