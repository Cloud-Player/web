import {ComponentFactoryResolver, Injectable, Type, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {Modal, ModalFactory, ModalStates} from '../src/modal-factory.class';
import {filter} from 'rxjs/internal/operators';

export enum ModalServiceStates {
  ModalVisbile,
  NoModalVisible,
  ModalAdded,
  ModalRemoved
}

@Injectable()
export class ModalService {
  private _modalStack: Array<Modal<any>> = [];
  private _initializeCbs: Array<Function> = [];
  private _subject: Subject<ModalServiceStates>;
  private _modalFactory: ModalFactory;
  private _isInitialised = false;
  private _lastRemovedModal;

  constructor() {
    this._modalFactory = new ModalFactory();
    this._subject = new Subject();
  }

  private addToStack(modal: Modal<any>) {
    if (this._modalStack.length > 0) {
      const lastOpenedModal = this._modalStack[this._modalStack.length - 1];
      lastOpenedModal.deactivate();
      this._lastRemovedModal = lastOpenedModal;
    }
    this._modalStack.push(modal);
  }

  private removeFromStack(modal: Modal<any>) {
    const index = this._modalStack.indexOf(modal);
    this._modalStack.splice(index, 1);
    if (index > 0) {
      const previousOpenedModal = this._modalStack[index - 1];
      previousOpenedModal.activate();
    }
    this._lastRemovedModal = modal;
  }

  public init(resolver: ComponentFactoryResolver, container: ViewContainerRef) {
    if (!this._isInitialised) {
      this._modalFactory.init(resolver, container);
      this._isInitialised = true;
      this._initializeCbs.forEach((cb) => {
        cb.apply(this);
      });
      this._initializeCbs = [];
    }
  }

  public bindModalListener<TComponent>(modal: Modal<TComponent>) {
    modal.getObservable()
      .pipe(
        filter(ev => ev === ModalStates.Opened)
      )
      .subscribe(() => {
        this.addToStack(modal);
        this._subject.next(ModalServiceStates.ModalAdded);
        if (this.getOpenedModalsAmount() === 1) {
          this._subject.next(ModalServiceStates.ModalVisbile);
        }
      });
    modal.getObservable()
      .pipe(
        filter(ev => ev === ModalStates.Closed)
      )
      .subscribe(() => {
        this.removeFromStack(modal);
        this._subject.next(ModalServiceStates.ModalRemoved);
        if (this.getOpenedModalsAmount() === 0) {
          this._subject.next(ModalServiceStates.NoModalVisible);
          this._lastRemovedModal = null;
        }
      });
  }

  public getOpenedModalsAmount() {
    return this._modalStack.length;
  }

  public getModalStack(): Array<Modal<any>> {
    return this._modalStack;
  }

  public getLastRemovedModal() {
    return this._lastRemovedModal;
  }

  public getOpenModal() {
    if (this._modalStack.length > 0) {
      return this._modalStack[this._modalStack.length - 1];
    }
  }

  public createModal<TComponent>(component: Type<TComponent>): Modal<TComponent> {
    let modal: Modal<TComponent>;

    if (this._isInitialised) {
      modal = this._modalFactory.createModal(component, this.bindModalListener.bind(this));
    } else {
      this._initializeCbs.push(() => {
        modal = this._modalFactory.createModal(component, this.bindModalListener.bind(this));
      });
    }
    return modal;
  }

  public createModalAsync<TComponent>(component: Type<TComponent>): Promise<Modal<TComponent>> {
    return new Promise<Modal<TComponent>>((resolve, reject) => {
      let modal: Modal<TComponent>;
      if (!this._isInitialised) {
        this._initializeCbs.push(() => {
          modal = this.createModal(component);
          resolve(modal);
        });
      } else {
        resolve(this.createModal(component));
      }
    });
  }

  public getObservable(): Subject<ModalServiceStates> {
    return this._subject;
  }
}
