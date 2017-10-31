import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  private image: HTMLImageElement;

  private imageIsLoaded: boolean;

  @Input('dragData') dragData: any;

  @Input('dragImageUrl') dragImageUrl: string;

  @Input('dragEffect') dragEffect: string;

  @HostListener('dragstart', ['$event'])
  onDragStart(event: any) {
    const transfer = <any>event.dataTransfer;
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
    this.el.nativeElement.classList.add('drag-in-progress');
  }

  @HostListener('dragend')
  onDragEnd() {
    this.el.nativeElement.classList.remove('drag-in-progress');
  }

  @HostListener('mouseover')
  onMouseOver() {
    if (this.dragImageUrl && (!this.image || this.image.src !== this.dragImageUrl)) {
      this.image = new Image();
      this.image.src = this.dragImageUrl;
      this.imageIsLoaded = false;
      this.image.onload = () => {
        this.imageIsLoaded = true;
      };
    }
  }

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.setAttribute('draggable', true);
  }

}
