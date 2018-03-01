import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {ModalComponent} from '../components/modal/modal/modal';
import {Subject} from 'rxjs/Subject';

export enum ModalStates {
  Initalised,
  Opened,
  Closed,
  Destroyed
}

export class Modal<TComponent> {
  private _resolver: ComponentFactoryResolver;
  private _container: ViewContainerRef;
  private _modalComponent: Type<ModalComponent>;
  private _contentComponent: Type<any>;
  private _modalRef: ComponentRef<ModalComponent>;
  private _initialised = false;
  private _isBuild = false;
  private _subject: Subject<ModalStates>;

  constructor(modalComponent: Type<ModalComponent>, contentComponent: Type<TComponent>) {
    this._modalComponent = modalComponent;
    this._contentComponent = contentComponent;
    this._subject = new Subject();
  }

  private build() {
    if (!this._isBuild) {
      const modalFactory: ComponentFactory<ModalComponent> = this._resolver.resolveComponentFactory(this._modalComponent);
      this._modalRef = this._container.createComponent(modalFactory);
      this._modalRef.instance.setComponent(this._contentComponent);
      this._modalRef.instance.setModal(this);
      this._isBuild = true;
    }
  }

  public init(resolver: ComponentFactoryResolver, container: ViewContainerRef) {
    if (!this._initialised) {
      this._initialised = true;
      this._resolver = resolver;
      this._container = container;
      this.build();
      this._subject.next(ModalStates.Initalised);
    }
  }

  public open() {
    if (this._initialised) {
      this._modalRef.instance.show();
      this._subject.next(ModalStates.Opened);
    } else {
      throw new Error('Modal is not initialised yet!');
    }
  }

  public getInstance(): TComponent {
    return this._modalRef.instance.getInstance();
  }

  public close() {
    this._subject.next(ModalStates.Closed);
    this._modalRef.instance.hide();
  }

  public destroy() {
    this._modalRef.destroy();
    this._subject.next(ModalStates.Destroyed);
    this._subject.unsubscribe();
  }

  public getObservable() {
    return this._subject;
  }
}

export enum ModalServiceStates {
  ModalVisbile,
  NoModalVisible,
  ModalAdded,
  ModalRemoved
}

@Injectable()
export class ModalService {
  private _resolver: ComponentFactoryResolver;
  private _container: ViewContainerRef;
  private _initialized = false;
  private _initializeCbs: Array<Function> = [];
  private _subject: Subject<ModalServiceStates>;
  private _openedModals = 0;

  constructor() {
    this._subject = new Subject();
  }

  public init(resolver: ComponentFactoryResolver, container: ViewContainerRef) {
    if (!this._initialized) {
      this._initialized = true;
      this._resolver = resolver;
      this._container = container;
      this._initializeCbs.forEach((cb) => {
        cb.apply(this);
      });
      this._initializeCbs = [];
    }
  }

  public bindModalListener<TComponent>(modal: Modal<TComponent>) {
    modal.getObservable()
      .filter(ev => ev === ModalStates.Opened)
      .subscribe(() => {
        this._openedModals++;
        this._subject.next(ModalServiceStates.ModalAdded);
        if (this._openedModals === 1) {
          this._subject.next(ModalServiceStates.ModalVisbile);
        }
      });
    modal.getObservable()
      .filter(ev => ev === ModalStates.Closed)
      .subscribe(() => {
        this._openedModals--;
        this._subject.next(ModalServiceStates.ModalRemoved);
        if (this._openedModals === 0) {
          this._subject.next(ModalServiceStates.NoModalVisible);
        }
      });
  }

  public createModal<TComponent>(component: Type<TComponent>): Modal<TComponent> {
    console.log('CREATE MODAL');
    const modal = new Modal<TComponent>(ModalComponent, component);
    if (this._initialized) {
      modal.init(this._resolver, this._container);
      this.bindModalListener(modal);
    } else {
      this._initializeCbs.push(() => {
        modal.init(this._resolver, this._container);
        this.bindModalListener(modal);
      });
    }
    return modal;
  }

  public getObservable(): Subject<ModalServiceStates> {
    return this._subject;
  }
}
