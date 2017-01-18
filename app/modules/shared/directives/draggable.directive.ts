import {Directive, ElementRef, HostListener, Input, Renderer} from '@angular/core';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {

  private image: HTMLImageElement;

  private imageIsLoaded: boolean;

  @Input('dragData') dragData: any;

  @Input('dragImageUrl') dragImageUrl: string;

  @Input('dragEffect') dragEffect: string;

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    let transfer = <any>event.dataTransfer;
    if (this.dragData) {
      try {
        transfer.setData('text', JSON.stringify(this.dragData));
      } catch (err) {
        throw new Error('DragData has to be a JSON object!');
      }
    }
    if (this.image && this.imageIsLoaded) {
      transfer.setDragImage(this.image, 10, 10);
    }
    if (this.dragEffect) {
      transfer.effectAllowed = this.dragEffect;
    }
    this.renderer.setElementClass(this.el.nativeElement, 'drag-in-progress', true);
  }

  @HostListener('dragend') onDragEnd() {
    this.renderer.setElementClass(this.el.nativeElement, 'drag-in-progress', false);
  }

  @HostListener('mouseover') onMouseOver() {
    if (this.dragImageUrl && (!this.image || this.image.src !== this.dragImageUrl)) {
      this.image = new Image();
      this.image.src = this.dragImageUrl;
      this.imageIsLoaded = false;
      this.image.onload = () => {
        this.imageIsLoaded = true;
      };
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer) {
  }

}
