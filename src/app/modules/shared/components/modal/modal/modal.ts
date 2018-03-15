import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {IModal, IModalComponent, IModalOptions, modalAction} from '../../../src/modal.interface';
import {Modal} from '../../../src/modal-factory.class';

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

  @Output()
  public visibilityChange: EventEmitter<boolean>;

  constructor(private resolver: ComponentFactoryResolver,
              private el: ElementRef) {
    this.modalOptions = {
      title: 'ABC',
      dismissible: true,
      primaryAction: {
        text: 'Ok'
      }
    };
    this.visibilityChange = new EventEmitter<boolean>();
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

  public activate() {
    this.el.nativeElement.style.display = 'block';
    this.visibilityChange.emit(true);
  }

  public deactivate() {
    this.el.nativeElement.style.display = 'none';
    this.visibilityChange.emit(false);
  }

  public show() {
    this.el.nativeElement.style.display = 'block';
    this.isVisible = true;
    if (this._componentRef && this._componentRef.instance.modalOnOpen) {
      this._componentRef.instance.modalOnOpen();
    }
    this.visibilityChange.emit(true);
  }

  public hide() {
    this.isVisible = false;
    this.visibilityChange.emit(false);
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

  public isDisabled(action: string) {
    if (typeof this.modalOptions[action].isDisabled === 'function') {
      return this.modalOptions[action].isDisabled();
    } else {
      return this.modalOptions[action].isDisabled;
    }
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
    if (this._componentRef) {
      this._componentRef.destroy();
    }
  }
}
