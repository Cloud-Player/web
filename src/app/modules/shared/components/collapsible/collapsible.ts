import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Subscription} from 'rxjs';
import {isUndefined} from 'underscore';

@Component({
  selector: 'app-collapsible',
  styleUrls: ['./collapsible.scss'],
  templateUrl: './collapsible.html'
})
export class CollapsibleComponent implements AfterContentInit, OnChanges, OnDestroy {
  private _transitionDuration = 200;
  private _subscriptions: Subscription;
  private _isCollapsed = false;

  @ViewChild('collapsibleBody')
  private _collapsibleBody: ElementRef;

  @ViewChild('collapsibleBodyContent')
  private _collapsibleBodyContent: ElementRef;

  @Input()
  public title: string;

  @Input()
  public icon: string;

  @Input()
  public isCollapsed = false;

  @Output()
  public isCollapsedChange: EventEmitter<boolean>;

  constructor(private renderer: Renderer2) {
    this._subscriptions = new Subscription();
    this.isCollapsedChange = new EventEmitter();
  }

  private getHeight = function (): number {
    return this._collapsibleBodyContent.nativeElement.offsetHeight;
  };

  private removeMaxHeight = function () {
    this._collapsibleBody.nativeElement.style.maxHeight = 'initial';
    this._collapsibleBody.nativeElement.style.overflow = 'initial';
  };

  private collapsibleOnOpened() {
    this._subscriptions.unsubscribe();
    this.removeMaxHeight();
    this.isCollapsed = false;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  private collapsibleOnClosed() {
    this._subscriptions.unsubscribe();
    this._isCollapsed = true;
    this.isCollapsed = true;
    this.isCollapsedChange.emit(this.isCollapsed);
  }

  private open() {
    const calculatedBodyHeight = this.getHeight();

    this._subscriptions.unsubscribe();
    this._subscriptions = new Subscription();
    this._subscriptions.add(
      this.renderer.listen(this._collapsibleBody.nativeElement, 'transitionend', this.collapsibleOnOpened.bind(this))
    );

    if (calculatedBodyHeight > 0) {
      this._collapsibleBody.nativeElement.style.maxHeight = 0;
      this._collapsibleBody.nativeElement.style.opacity = 0;
      this._isCollapsed = false;

      setTimeout(() => {
        this._collapsibleBody.nativeElement.style.overflow = 'hidden';
        this._collapsibleBody.nativeElement.style.opacity = 1;
        this._collapsibleBody.nativeElement.style.maxHeight = `${calculatedBodyHeight}px`;
      }, 5);
    }
  }

  private close() {
    this._subscriptions.unsubscribe();
    this._subscriptions = new Subscription();
    this._subscriptions.add(
      this.renderer.listen(this._collapsibleBody.nativeElement, 'transitionend', this.collapsibleOnClosed.bind(this))
    );

    this._collapsibleBody.nativeElement.style.transition = `all ${this._transitionDuration / 1000}s ease`;
    this._collapsibleBody.nativeElement.style.maxHeight = `${this.getHeight()}px`;
    this._collapsibleBody.nativeElement.style.opacity = 1;

    setTimeout(() => {
      this._collapsibleBody.nativeElement.style.overflow = 'hidden';
      this._collapsibleBody.nativeElement.style.opacity = 0;
      this._collapsibleBody.nativeElement.style.maxHeight = '0px';
    }, 5);
  }

  public isOpened() {
    return !this._isCollapsed;
  }

  public toggle() {
    if (this._isCollapsed) {
      this.open();
    } else {
      this.close();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isCollapsed && !isUndefined(changes.isCollapsed.currentValue) && changes.isCollapsed.currentValue !== this._isCollapsed) {
      if (changes.isCollapsed.currentValue) {
        this.close();
      } else {
        this.open();
      }
    }
  }

  ngAfterContentInit(): void {
    if (!isUndefined(this.isCollapsed)) {
      if (this.isCollapsed) {
        this.close();
      } else {
        this.open();
      }
    }

    this._collapsibleBody.nativeElement.style.transition = `all ${this._transitionDuration / 1000}s ease`;
  }

  ngOnDestroy(){
    this._subscriptions.unsubscribe();
  }

}
