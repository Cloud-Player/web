import {Injectable, NgZone} from '@angular/core';
import {debounce, isString} from 'underscore';
import {Utils} from '../src/utils.class';
import {Subject} from 'rxjs';

export enum LayoutChangeTypes {
  windowSizeChange,
  windowElementChange,
  windowBreakpointChange,
  menuSidebarChange
}

export enum WindowElementTypes {
  MusicPlayer,
  Modal,
  NativeDesktopApp
}

export enum WindowBreakPointTypes {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg'
}

export interface ILayout {
  windowSize: {
    width: number;
    height: number;
  };
  windowElements: Array<WindowElementTypes>;
  activeBreakpoint: WindowBreakPointTypes;
}

export interface ILayoutChange {
  changeType: LayoutChangeTypes;
  newLayout: ILayout;
}

@Injectable()
export class LayoutService {
  private _subject: Subject<ILayoutChange>;
  private _layoutProperties: ILayout;
  private _breakPointEls: Array<HTMLElement>;

  private static createBreakPointEl(breakPoint: string) {
    const node = Utils.createDivEl([`visible-${breakPoint}`]);
    node.dataset.breakPointType = breakPoint;
    return node;
  }

  constructor(private zone: NgZone) {
    this._subject = new Subject<ILayoutChange>();
    this._breakPointEls = [];
    this._layoutProperties = {
      windowSize: {
        width: 0,
        height: 0
      },
      windowElements: [],
      activeBreakpoint: null
    };
    const throttledResizeListener = debounce(this.onWindowResize.bind(this), 100);
    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', throttledResizeListener);
    });
    this.appendBreakPointEls();
    this.setActiveBreakPoint();
  }

  private onWindowResize() {
    this.emitLayoutChange(LayoutChangeTypes.windowSizeChange);
    this.setActiveBreakPoint();
  }

  private appendBreakPointEls() {
    for (const breakPoint in WindowBreakPointTypes) {
      if (isString(breakPoint)) {
        const breakPointEl = LayoutService.createBreakPointEl(breakPoint);
        document.querySelector('body').appendChild(breakPointEl);
        this._breakPointEls.push(breakPointEl);
      }
    }
  }

  private setActiveBreakPoint() {
    const oldBreakPoint = this._layoutProperties.activeBreakpoint;
    this._breakPointEls.every((breakPointEl: HTMLElement) => {
      if (Utils.elementIsVisible(breakPointEl)) {
        this._layoutProperties.activeBreakpoint = WindowBreakPointTypes[breakPointEl.dataset.breakPointType];
        return false;
      } else {
        return true;
      }
    });

    if (oldBreakPoint !== this._layoutProperties.activeBreakpoint) {
      this.emitLayoutChange(LayoutChangeTypes.windowBreakpointChange);
    }
  }

  private setWindowSize() {
    this._layoutProperties.windowSize.width = window.innerWidth;
    this._layoutProperties.windowSize.height = window.innerHeight;
  }

  public getObservable(): Subject<ILayoutChange> {
    return this._subject;
  }

  public emitLayoutChange(layoutChangeType: LayoutChangeTypes): void {
    this.setWindowSize();
    this._subject.next({
      changeType: layoutChangeType,
      newLayout: this._layoutProperties
    });
  }

  public registerWindowElement(element: WindowElementTypes) {
    if (!this.hasWindowElement(element)) {
      this._layoutProperties.windowElements.push(element);
      this.emitLayoutChange(LayoutChangeTypes.windowElementChange);
    }
  }

  public unRegisterWindowElement(element: WindowElementTypes) {
    if (this.hasWindowElement(element)) {
      const index = this._layoutProperties.windowElements.indexOf(element);
      this._layoutProperties.windowElements.splice(index, 1);
      this.emitLayoutChange(LayoutChangeTypes.windowElementChange);
    }
  }

  public hasWindowElement(element: WindowElementTypes) {
    return this._layoutProperties.windowElements.indexOf(element) !== -1;
  }

  public getLayoutProperties(): ILayout {
    return this._layoutProperties;
  }

  public isBreakPointActive(breakpoint: WindowBreakPointTypes): boolean {
    return this._layoutProperties.activeBreakpoint === breakpoint;
  }

  public isOneOfTheBreakPointsActive(breakpoints: Array<WindowBreakPointTypes>): boolean {
    let isActive = false;
    breakpoints.every((breakpoint) => {
      if (this.isBreakPointActive(breakpoint)) {
        isActive = true;
        return false;
      }
      return true;
    });
    return isActive;
  }
}
