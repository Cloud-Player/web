import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {ModalFactory} from '../src/modal-factory.class';

export class Modal {
  private _modalFactory: ModalFactory;

  constructor(modalFactory: ModalFactory) {
    this._modalFactory = modalFactory;
  }

  open() {

  }

  close() {

  }
}

@Injectable()
export class ModalService {
  private _modalFactory: ModalFactory;

  constructor() {
    this._modalFactory = new ModalFactory();
  }

  public initModalFactory(resolver: ComponentFactoryResolver, container: ViewContainerRef) {
    this._modalFactory.init(resolver, container);
  }

  public createModal() {

  }
}
