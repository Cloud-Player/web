import {Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, EventEmitter, Renderer2, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

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
  title: string;
  action: EventEmitter<any>;
}

@Component({
  selector: 'app-context-menu',
  styleUrls: ['./context-menu.scss'],
  templateUrl: './context-menu.html'
})
export class ContextMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  private _isOpen: boolean;
  private _contextMenuManager: ContextMenuManager;
  private _subscriptions: Subscription;

  public options: Array<IContextOption>;
  @ViewChild('container')
  public container: ElementRef;

  @ViewChild('contextMenu')
  public contextMenu: ElementRef;

  constructor(private renderer2: Renderer2) {
    this.options = [];
    this._contextMenuManager = ContextMenuManager.getInstance();
    this._contextMenuManager.add(this);
    this._subscriptions = new Subscription();
  }

  public show(posX: number, posY: number) {
    this._contextMenuManager.hideAll();
    this.contextMenu.nativeElement.style.transform = `translate(${posX}px,${posY}px)`;
    this.contextMenu.nativeElement.style.display = 'block';
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
    this.contextMenu.nativeElement.style.display = 'none';
    this._isOpen = false;
  }

  public registerOption(option: IContextOption) {
    this.options.push(option);
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
    this._subscriptions.unsubscribe();
  }
}
