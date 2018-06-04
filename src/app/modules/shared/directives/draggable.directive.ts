import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DragAndDropService} from '../services/drag-and-drop';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit, OnDestroy {
  private _image: HTMLImageElement;
  private _imageIsLoaded: boolean;
  private _subscriptions: Subscription;

  @Input('dragData') dragData: any;

  @Input('dragImageUrl') dragImageUrl: string;

  @Input('dragEffect') dragEffect: string;

  constructor(private el: ElementRef, private renderer2: Renderer2, private dragAndDropService: DragAndDropService) {
    this._subscriptions = new Subscription();
  }

  private onDragStart(event: any) {
    const transfer = <any>event.dataTransfer;
    if (this.dragData) {
      try {
        transfer.setData('text/plain', JSON.stringify(this.dragData));
      } catch (err) {
        throw new Error('DragData has to be a JSON object!');
      }
      this.dragAndDropService.dragStart(this.dragData);
    } else {
      transfer.setData('text/plain', ' ');
    }
    if (this._image && this._imageIsLoaded) {
      transfer.setDragImage(this._image, 10, 10);
    }
    if (this.dragEffect) {
      transfer.effectAllowed = this.dragEffect;
    }
    this.el.nativeElement.classList.add('drag-in-progress');
  }

  private onDragEnd() {
    this.el.nativeElement.classList.remove('drag-in-progress');
    this.dragAndDropService.dragEnd();
  }

  private onMouseOver() {
    if (this.dragImageUrl && (!this._image || this._image.src !== this.dragImageUrl)) {
      this._image = new Image();
      this._image.src = this.dragImageUrl;
      this._imageIsLoaded = false;
      this._image.onload = () => {
        this._imageIsLoaded = true;
      };
    }
  }

  ngOnInit(): void {
    this.el.nativeElement.setAttribute('draggable', true);

    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'mouseover', this.onMouseOver.bind(this))
    );

    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this))
    );

    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'dragend', this.onDragEnd.bind(this))
    );

    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'dragover', (ev) => {
        ev.preventDefault();
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
