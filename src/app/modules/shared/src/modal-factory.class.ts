import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {ModalComponent} from '../components/modal/modal/modal';

@Injectable()
export class ModalFactory {
  private _resolver: ComponentFactoryResolver;
  private _container: ViewContainerRef;

  constructor() {
  }

  private createNewModal() {
    const component: Type<ModalComponent> = ModalComponent;
    const factory: ComponentFactory<ModalComponent> = this._resolver.resolveComponentFactory(component);
    const modalComponent: ComponentRef<ModalComponent> = this._container.createComponent(factory);

    return modalComponent;
  }

  public init(resolver: ComponentFactoryResolver, container: ViewContainerRef) {
    this._resolver = resolver;
    this._container = container;
  }

  public createModal() {

  }
}
