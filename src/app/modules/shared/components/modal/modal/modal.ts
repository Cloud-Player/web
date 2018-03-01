import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, forwardRef, Inject, OnDestroy, OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Modal} from '../../../services/modal';
import {state, style, transition, trigger, animate, AnimationEvent} from '@angular/animations';
import {IModal, IModalComponent, IModalOptions, modalAction} from '../../../src/modal.interface';

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.scss'],
  templateUrl: './modal.html',
  animations: [
    trigger('modalState', [
      state('hidden', style({transform: 'translateX(0) scale(0.8)', opacity: 0})),
      state('visible', style({transform: 'translateX(0) scale(1)', opacity: 1})),
      transition('hidden => visible', animate('100ms ease-in')),
      transition('visible => hidden', animate('100ms ease-out'))
    ])
  ]
})
export class ModalComponent implements IModal, OnInit, OnDestroy {
  private _component: Type<any>;
  private _componentRef: ComponentRef<IModalComponent>;
  private _isBuild: boolean;
  private _modal: Modal<any>;
  public isVisible = false;
  public modalOptions: IModalOptions;

  @ViewChild('modalContainer', {read: ViewContainerRef})
  public container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private el: ElementRef) {
    this.modalOptions = {
      title: 'ABC',
      dismissible: true,
      primaryAction: {
        text: 'Ok'
      }
    };
  }

  private build() {
    if (!this._isBuild) {
      const modalFactory: ComponentFactory<IModalComponent> = this.resolver.resolveComponentFactory(this._component);
      this._componentRef = this.container.createComponent(modalFactory);
      this.modalOptions = this._componentRef.instance.modalOptions;
      if (this._componentRef.instance.setModal) {
        this._componentRef.instance.setModal(this);
      }
      this._isBuild = true;
    }
  }

  private close() {
    if (this._modal) {
      this._modal.close();
    }
    if (this._componentRef && this._componentRef.instance.modalOnClose) {
      this._componentRef.instance.modalOnClose();
    }
    this.el.nativeElement.style.display = 'none';
  }

  public setModal(modal: Modal<any>) {
    this._modal = modal;
  }

  public setComponent(component: Type<any>) {
    this._component = component;
    this.build();
  }

  public show() {
    console.log('SHOW!');
    this.el.nativeElement.style.display = 'block';
    this.isVisible = true;
    if (this._componentRef && this._componentRef.instance.modalOnOpen) {
      this._componentRef.instance.modalOnOpen();
    }
  }

  public hide() {
    this.isVisible = false;
  }

  public getTitle() {
    return this.modalOptions.title;
  }

  public hideAfterExecution(action: modalAction) {
    if (action) {
      Promise.resolve(action(this)).then(this.hide.bind(this));
    } else {
      this.hide();
    }
  }

  public executeSecondary() {
    this.hideAfterExecution(this.modalOptions.secondaryAction.action);
  }

  public executePrimary() {
    this.hideAfterExecution(this.modalOptions.primaryAction.action);
  }

  public hasFooter() {
    return this.modalOptions.primaryAction || this.modalOptions.secondaryAction;
  }

  public getInstance(): any {
    return this._componentRef.instance;
  }

  handleDone(event: AnimationEvent) {
    if (event.fromState === 'visible' && event.toState === 'hidden') {
      this.close();
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('DESTROY');
    if (this._componentRef) {
      this._componentRef.destroy();
    }
  }
}
