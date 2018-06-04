import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {Subscription} from 'rxjs';
import {debounce} from 'underscore';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

class ContextMenuManager {
  private static contextMenuManager: ContextMenuManager;
  private _store = [];

  public static getInstance() {
    if (!this.contextMenuManager) {
      this.contextMenuManager = new ContextMenuManager();
    }
    return this.contextMenuManager;
  }

  public add(contextMenu: ContextMenuComponent) {
    this._store.push(contextMenu);
  }

  public remove(contextMenu: ContextMenuComponent) {

  }

  public hideAll() {
    this._store.forEach((contextMenu) => {
      contextMenu.hide();
    });
  }
}

export interface IContextOption {
  id: string;
  title: string;
  icon: string;
  action: EventEmitter<any>;
}

@Component({
  selector: 'app-context-menu',
  styleUrls: ['./context-menu.scss'],
  templateUrl: './context-menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  private _isOpen: boolean;
  private _contextMenuManager: ContextMenuManager;
  private _subscriptions: Subscription;
  private _debouncedUpdate: Function;
  private _isDestroyed = false;

  public options: Array<IContextOption>;
  @ViewChild('container')
  public container: ElementRef;

  @ViewChild('contextMenu')
  public contextMenu: ElementRef;

  constructor(private el: ElementRef,
              private renderer2: Renderer2,
              private cdr: ChangeDetectorRef,
              private userAnalyticsService: UserAnalyticsService) {
    this.options = [];
    this._contextMenuManager = ContextMenuManager.getInstance();
    this._contextMenuManager.add(this);
    this._subscriptions = new Subscription();
    this._debouncedUpdate = debounce(this.update.bind(this), 100);
  }

  private update() {
    // The method is called debounced which can not be terminated. When the view is destroyed
    // the method might be called again even though the view is not available anymore
    if (!this._isDestroyed) {
      this.cdr.detectChanges();
    }
  }

  public show(posX: number, posY: number) {
    if (this._isOpen) {
      return;
    }
    this._contextMenuManager.hideAll();
    this.contextMenu.nativeElement.style.transform = `translate(${posX + 5}px,${posY + 5}px)`;
    this.el.nativeElement.classList.add('visible');
    this.contextMenu.nativeElement.focus();
    this._isOpen = true;

    const unbindListener = this.renderer2.listen(document, 'click', (ev) => {
      if (ev.which !== 3) {
        ev.preventDefault();
        this.hide();
        unbindListener();
      }
    });
    this._subscriptions.add(unbindListener);
  }

  public hide() {
    this.el.nativeElement.classList.remove('visible');
    this._isOpen = false;
  }

  public registerOption(option: IContextOption) {
    this.options.push(option);
    this._debouncedUpdate();
  }

  public unRegisterOption(id: string) {
    this.options.every((option, index) => {
      if (option.id === id) {
        this.options.splice(index, 1);
        return false;
      } else {
        return true;
      }
    });
  }

  public executeAction(option: IContextOption) {
    option.action.emit();
    this.userAnalyticsService.trackEvent('context_menu', `click_${option.title}`, 'app-context-menu');
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.container.nativeElement) {
      const contextmenuListener = this.renderer2.listen(
        this.container.nativeElement,
        'contextmenu',
        (ev: MouseEvent) => {
          ev.preventDefault();
          this.show(ev.clientX, ev.clientY);
        });
      this._subscriptions.add(contextmenuListener);
    }
  }

  ngOnDestroy() {
    this._isDestroyed = true;
    this.options = [];
    this._subscriptions.unsubscribe();
  }
}
