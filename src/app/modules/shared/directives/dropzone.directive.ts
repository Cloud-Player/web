import {Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {DragAndDropService, DragAndDropStates, IDragAndDropData} from '../services/drag-and-drop';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/internal/operators';

@Directive({
  selector: '[appDropzone]'
})
export class DropZoneDirective implements OnInit, OnDestroy {
  private _leaveTimeout: number;
  private _subscriptions: Subscription;
  private _hasEntered: boolean;

  @Output('dropData')
  public drop: EventEmitter<IDragAndDropData>;

  @Output('dragOver')
  public dragOver: EventEmitter<IDragAndDropData>;

  @Output('dragEnter')
  public dragEnter: EventEmitter<IDragAndDropData>;

  @Output('dragLeave')
  public dragLeave: EventEmitter<IDragAndDropData>;

  @Input('dropItemRef')
  public dropItemRef: any;

  constructor(private el: ElementRef,
              private renderer2: Renderer2,
              private zone: NgZone,
              private dragAndDropService: DragAndDropService) {
    this.dragOver = new EventEmitter();
    this.dragEnter = new EventEmitter();
    this.dragLeave = new EventEmitter();
    this.drop = new EventEmitter();
    this._subscriptions = new Subscription();
  }

  private execCallback(emitter: EventEmitter<IDragAndDropData>, event: any) {
    if (emitter) {
      const dragAndDropData = this.dragAndDropService.getDragData();
      if (this.dropItemRef) {
        dragAndDropData.dropReference = this.dropItemRef;
      }
      emitter.emit(dragAndDropData);
    }
  }

  private onDragEnter(event) {
    this.execCallback(this.dragEnter, event);
    this.el.nativeElement.classList.add('drag-over');
    this._hasEntered = true;
  }

  private onDragOver(event: any) {
    if (event) {
      event.preventDefault();
    }
  }

  private onDragLeave(event) {
    clearTimeout(this._leaveTimeout);
    this.execCallback(this.dragLeave, event);
    this.el.nativeElement.classList.remove('drag-over');
  }

  private onDrop(event: any) {
    if (event) {
      event.preventDefault();
    }
    this.onDragLeave(event);
    this.execCallback(this.drop, event);
  }

  public ngOnInit(): void {
    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'dragenter', this.onDragEnter.bind(this))
    );

    this.zone.runOutsideAngular(() => {
      this._subscriptions.add(
        this.renderer2.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this))
      );
    });

    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this))
    );

    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'drop', this.onDrop.bind(this))
    );

    this.dragAndDropService.getObservable()
      .pipe(
        filter(dragAndDropState => dragAndDropState === DragAndDropStates.DragStart)
      )
      .subscribe(() => {
        for (let i = 0; i < this.el.nativeElement.children.length; i++) {
          this.el.nativeElement.children[i].style.pointerEvents = 'none';
        }
      });
    this.dragAndDropService.getObservable()
      .pipe(
        filter(dragAndDropState => dragAndDropState === DragAndDropStates.DragEnd)
      )
      .subscribe(() => {
        for (let i = 0; i < this.el.nativeElement.children.length; i++) {
          this.el.nativeElement.children[i].style.pointerEvents = 'initial';
        }
      });
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    clearTimeout(this._leaveTimeout);
  }

}
