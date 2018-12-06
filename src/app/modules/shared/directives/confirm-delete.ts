import {AfterContentInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/internal/operators';
import {ModalService} from '../services/modal';
import {ModalStates} from '../src/modal-factory.class';
import {ConfirmDeleteComponent} from '../components/confirm-delete/confirm-delete';

@Directive({
  selector: '[appConfirmDelete]'
})
export class ConfirmDeleteDirective implements AfterContentInit, OnDestroy {
  private _subscriptions: Subscription;

  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private modalService: ModalService) {
    this._subscriptions = new Subscription();
  }

  @Output()
  public confirmedClick = new EventEmitter();

  @Input()
  public entityType: string;

  @Input()
  public name: string;

  private askUser() {
    return new Promise((resolve, reject) => {
      this.modalService.createModalAsync(ConfirmDeleteComponent)
        .then((modal) => {
          modal.getInstance().entityType = this.entityType;
          modal.getInstance().name = this.name;
          modal.open();
          modal.getObservable()
            .pipe(
              filter(ev => ev === ModalStates.ExecutedPrimary)
            )
            .subscribe(() => {
              resolve();
            });
          modal.getObservable()
            .pipe(
              filter(ev => ev === ModalStates.Abort)
            )
            .subscribe(() => {
              reject();
            });
        });
    });
  }

  private onClick(ev) {
    ev.preventDefault();
    this.askUser().then(() => {
      this.confirmedClick.emit();
    }, () => {
      console.log('User canceled');
    });
  }

  ngAfterContentInit(): void {
    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'click', this.onClick.bind(this))
    );

  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
