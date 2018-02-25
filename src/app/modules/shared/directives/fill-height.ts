import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnDestroy,
  OnInit
} from '@angular/core';
import {LayoutChangeTypes, LayoutService, WindowBreakPointTypes, WindowElementTypes} from '../services/layout';
import {Subscription} from 'rxjs/Subscription';

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

  constructor(private el: ElementRef, private layoutService: LayoutService) {
    this._subscription = new Subscription();
  }

  private setHeight() {
    const offsetTop = this._boundingClientRec.top;
    let fixedFooterElementHeight = 0;
    if (this.layoutService.isOneOfTheBreakPointsActive([WindowBreakPointTypes.sm, WindowBreakPointTypes.xs])) {
      fixedFooterElementHeight += FillHeightDirective.menuHeight;
    }
    if (this.layoutService.isBreakPointActive(WindowBreakPointTypes.xs) &&
      this.layoutService.hasWindowElement(WindowElementTypes.MusicPlayer)) {
      fixedFooterElementHeight += FillHeightDirective.playerHeight;
    }

    if (this.minHeight) {
      this.el.nativeElement.style.minHeight = `calc(100vh - ${offsetTop + fixedFooterElementHeight - this._padding}px)`;
    } else {
      this.el.nativeElement.style.height = `calc(100vh - ${offsetTop + fixedFooterElementHeight - this._padding}px)`;
    }
  }

  ngAfterContentInit(): void {
    this._padding += parseInt(this.el.nativeElement.style.paddingTop, 10) || 0;
    this._padding += parseInt(this.el.nativeElement.style.paddingBottom, 10) || 0;
    this._boundingClientRec = this.el.nativeElement.getBoundingClientRect();
    this.setHeight();
    this._subscription.add(
      this.layoutService.getObservable()
        .filter((ev) => {
          return ev.changeType === LayoutChangeTypes.windowBreakpointChange || ev.changeType === LayoutChangeTypes.windowElementChange;
        })
        .subscribe(this.setHeight.bind(this))
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
