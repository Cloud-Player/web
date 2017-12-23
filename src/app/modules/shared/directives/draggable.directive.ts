import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit, OnDestroy {
  private _image: HTMLImageElement;
  private _imageIsLoaded: boolean;

  @Input('dragData') dragData: any;

  @Input('dragImageUrl') dragImageUrl: string;

  @Input('dragEffect') dragEffect: string;

  constructor(private el: ElementRef) {

  }

  private onDragStart(event: any) {
    const transfer = <any>event.dataTransfer;
    if (this.dragData) {
      try {
        transfer.setData('text', JSON.stringify(this.dragData));
      } catch (err) {
        throw new Error('DragData has to be a JSON object!');
      }
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
    this.el.nativeElement.addEventListener('mouseover', this.onMouseOver.bind(this));
    this.el.nativeElement.addEventListener('dragstart', this.onDragStart.bind(this));
    this.el.nativeElement.addEventListener('dragend', this.onDragEnd.bind(this));
  }

  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener('mouseover', this.onMouseOver.bind(this));
    this.el.nativeElement.removeEventListener('dragstart', this.onDragStart.bind(this));
    this.el.nativeElement.removeEventListener('dragend', this.onDragEnd.bind(this));
  }

}
