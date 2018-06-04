import {Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalService, ModalServiceStates} from '../../../services/modal';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {LayoutService, WindowElementTypes} from '../../../services/layout';
import {filter} from 'rxjs/internal/operators';

@Component({
  selector: 'app-modal-holder',
  styleUrls: ['./modal-holder.scss'],
  templateUrl: './modal-holder.html',
  animations: [
    trigger('backdropState', [
      state('hidden', style({opacity: 0})),
      state('visible', style({opacity: 1})),
      transition('hidden => visible', animate('100ms ease-in')),
      transition('visible => hidden', animate('100ms ease-out'))
    ])
  ]
})
export class ModalHolderComponent implements OnInit, OnDestroy {
  @ViewChild('modalContainer', {read: ViewContainerRef})
  private _container: ViewContainerRef;

  public showBackdrop = false;

  constructor(private el: ElementRef,
              private resolver: ComponentFactoryResolver,
              private modalService: ModalService,
              private layoutService: LayoutService) {
  }

  private onFirstModalBecameVisible() {
    this.el.nativeElement.classList.add('has-visible-modals');
    this.showBackdrop = true;
    setTimeout(() => {
      this.layoutService.registerWindowElement(WindowElementTypes.Modal);
    });
  }

  private onNoMoreModalVisible() {
    this.showBackdrop = false;
    this.layoutService.unRegisterWindowElement(WindowElementTypes.Modal);
  }

  handleDone(event: AnimationEvent) {
    if (event.fromState === 'visible' && event.toState === 'hidden') {
      this.el.nativeElement.classList.remove('has-visible-modals');
    }
  }

  ngOnInit(): void {
    this.modalService.init(this.resolver, this._container);

    this.modalService.getObservable()
      .pipe(
        filter(ev => ev === ModalServiceStates.ModalVisbile)
      )
      .subscribe(this.onFirstModalBecameVisible.bind(this));

    this.modalService.getObservable()
      .pipe(
        filter(ev => ev === ModalServiceStates.NoModalVisible)
      )
      .subscribe(this.onNoMoreModalVisible.bind(this));
  }

  ngOnDestroy(): void {
  }
}
