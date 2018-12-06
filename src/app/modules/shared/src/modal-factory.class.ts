import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef} from '@angular/core';
import {ModalComponent} from '../components/modal/modal/modal';
import {Subject} from 'rxjs';
import {IModalOptions, ModalActionButton} from './modal.interface';

export enum ModalStates {
  Initalised,
  Opened,
  Closed,
  ExecutePrimaryInProgress,
  ExecutedPrimary,
  ExecuteSecondaryInProgress,
  ExecutedSecondary,
  Abort,
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
  private _modalFactory: ModalFactory;

  constructor(modalComponent: Type<ModalComponent>,
              contentComponent: Type<TComponent>,
              modalFactory: ModalFactory) {
    this._modalComponent = modalComponent;
    this._contentComponent = contentComponent;
    this._subject = new Subject();
    this._modalFactory = modalFactory;
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
      this._modalRef.instance.actionExecuted
        .subscribe((ev) => {
          switch (ev) {
            case ModalActionButton.PRIMARY:
              this._subject.next(ModalStates.ExecutePrimaryInProgress);
              break;
            case ModalActionButton.PRIMARYDONE:
              this._subject.next(ModalStates.ExecutedPrimary);
              break;
            case ModalActionButton.SECONDARY:
              this._subject.next(ModalStates.Abort);
              this._subject.next(ModalStates.ExecuteSecondaryInProgress);
              break;
            case ModalActionButton.SECONDARYDONE:
              this._subject.next(ModalStates.ExecutedSecondary);
              break;
            case ModalActionButton.CANCEL:
              this._subject.next(ModalStates.Abort);
              break;
          }
        });
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

  public activate() {
    this._modalRef.instance.activate();
  }

  public deactivate() {
    this._modalRef.instance.deactivate();
  }

  public getInstance(): TComponent {
    return this._modalRef.instance.getInstance();
  }

  public getOptions(): IModalOptions {
    return this._modalRef.instance.getOptions();
  }

  public close() {
    this._subject.next(ModalStates.Closed);
    this._modalRef.instance.hide();
  }

  public getTitle() {
    if (this._modalRef) {
      return this._modalRef.instance.getTitle();
    }
  }

  public getElement() {
    if (this._modalRef) {
      return this._modalRef.instance.getElement();
    }
  }

  public destroy() {
    this._modalFactory.destroyModal(this);
  }

  public $cleanUp() {
    this._modalRef.instance.actionExecuted.unsubscribe();
    this._modalRef.destroy();
    this._subject.next(ModalStates.Destroyed);
    this._subject.unsubscribe();
  }

  public getObservable() {
    return this._subject;
  }
}

interface IModalStoreItem {
  component: Type<Component>;
  modal: Modal<any>;
  usedBy: number;
}

export class ModalFactory {
  private _resolver: ComponentFactoryResolver;
  private _container: ViewContainerRef;
  private _modalStore: Array<IModalStoreItem> = [];

  constructor() {
  }

  private createNewModalStoreItem<TComponent>(component: Type<TComponent>): IModalStoreItem {
    const modal = new Modal<TComponent>(ModalComponent, component, this);
    modal.init(this._resolver, this._container);
    const modalStoreItem = {component: component, modal: modal, usedBy: 0};
    this._modalStore.push(modalStoreItem);
    return modalStoreItem;
  }

  private getExistingModalStoreItem<TComponent>(component: Type<TComponent>): IModalStoreItem {
    let existingModalStoreItem;
    this._modalStore.every((modalStoreItem) => {
      if (modalStoreItem.component === component) {
        existingModalStoreItem = modalStoreItem;
        return false;
      } else {
        return true;
      }
    });
    return existingModalStoreItem;
  }

  public init(resolver: ComponentFactoryResolver, container: ViewContainerRef) {
    this._resolver = resolver;
    this._container = container;
  }

  public createModal<TComponent>(component: Type<TComponent>, onCreateCallback?: Function): Modal<TComponent> {
    if (!this._container) {
      throw new Error('A container has to be set before you can create a modal! Call setContainer()');
    }

    let modalStoreItem = this.getExistingModalStoreItem(component);

    if (!modalStoreItem) {
      modalStoreItem = this.createNewModalStoreItem(component);
      if (onCreateCallback) {
        onCreateCallback(modalStoreItem.modal);
      }
    }
    modalStoreItem.usedBy++;
    return modalStoreItem.modal;
  }

  public destroyModal(modal: Modal<Component>): boolean {
    let existingModalStoreItem;
    let indexOfExistingModal;
    this._modalStore.every((modalStoreItem, index) => {
      if (modalStoreItem.modal === modal) {
        existingModalStoreItem = modalStoreItem;
        indexOfExistingModal = index;
        return false;
      } else {
        return true;
      }
    });
    if (existingModalStoreItem) {
      existingModalStoreItem.usedBy--;
      if (existingModalStoreItem.usedBy === 0) {
        modal.$cleanUp();
        this._modalStore.splice(indexOfExistingModal, 1);
        return true;
      }
    }
  }
}
